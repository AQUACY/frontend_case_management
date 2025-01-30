<template>
  <div class="payment-form">
    <q-card class="payment-card" bordered>
      <q-card-section>
        <div class="text-h6">Payment Details</div>
        <div class="text-caption q-mt-sm">Secure payment powered by Stripe</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Amount Input -->
          <div class="col-12">
            <div class="text-subtitle2 q-mb-sm">Amount</div>
            <q-input
              v-model="amount"
              type="number"
              prefix="$"
              :rules="[
                (val) => !!val || 'Amount is required',
                (val) => Number(val) > 0 || 'Amount must be greater than 0',
                (val) => !isNaN(Number(val)) || 'Must be a valid number',
              ]"
              @update:model-value="validateAmount"
              outlined
              dense
              :error="!!amountError"
              :error-message="amountError"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
            <div class="text-caption text-grey-8 q-mt-sm">Enter amount in USD (minimum $1)</div>
          </div>

          <!-- Card Element -->
          <div class="col-12">
            <div class="text-subtitle2 q-mb-sm">Card Information</div>
            <div
              ref="cardElement"
              class="card-element q-pa-md"
              :class="{ 'card-element-error': cardError }"
            ></div>
            <div class="text-negative text-caption q-mt-sm" v-if="cardError">
              {{ cardError }}
            </div>
          </div>

          <!-- Note -->
          <div class="col-12">
            <div class="text-subtitle2 q-mb-sm">Note (Optional)</div>
            <q-input
              v-model="note"
              type="textarea"
              outlined
              dense
              placeholder="Add any additional information"
            />
          </div>
        </div>
      </q-card-section>

      <!-- Payment Summary -->
      <q-card-section class="bg-grey-1">
        <div class="row justify-between items-center">
          <div class="text-subtitle1">Total Amount:</div>
          <div class="text-h6">${{ amount || '0.00' }}</div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="$emit('close')" :disable="loading" />
        <q-btn label="Pay Now" color="green" :loading="loading" @click="handlePayment">
          <template v-slot:loading>
            <q-spinner-dots />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>

    <!-- Success Dialog -->
    <q-dialog v-model="showSuccessDialog">
      <q-card class="text-center" style="min-width: 300px">
        <q-card-section>
          <q-avatar size="72px" color="positive" text-color="white">
            <q-icon name="check" size="48px" />
          </q-avatar>
          <div class="text-h6 q-mt-md">Payment Successful!</div>
          <div class="text-body2 q-mt-sm">Your payment has been processed successfully.</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="positive" label="Done" @click="handleSuccess" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Error Dialog -->
    <q-dialog v-model="showErrorDialog">
      <q-card class="text-center" style="min-width: 300px">
        <q-card-section>
          <q-avatar size="72px" color="negative" text-color="white">
            <q-icon name="error" size="48px" />
          </q-avatar>
          <div class="text-h6 q-mt-md">Payment Failed</div>
          <div class="text-body2 q-mt-sm">
            {{ paymentError }}
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="green" label="Try Again" @click="showErrorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePaymentStore } from 'src/stores/payment'

export default {
  name: 'PaymentForm',

  setup(props, { emit }) {
    const $q = useQuasar()
    const store = usePaymentStore()

    const cardElement = ref(null)
    const stripeCard = ref(null)
    const amount = ref('') // Initialize as empty string
    const amountError = ref('')
    const note = ref('')
    const loading = ref(false)
    const cardError = ref('')
    const showSuccessDialog = ref(false)
    const showErrorDialog = ref(false)
    const paymentError = ref('')

    const validateAmount = (value) => {
      amountError.value = ''
      const numValue = Number(value)

      if (!value) {
        amountError.value = 'Amount is required'
        return false
      }

      if (isNaN(numValue)) {
        amountError.value = 'Must be a valid number'
        return false
      }

      if (numValue <= 0) {
        amountError.value = 'Amount must be greater than 0'
        return false
      }

      // Ensure we have at most 2 decimal places
      amount.value = Math.round(numValue * 100) / 100
      return true
    }

    onMounted(async () => {
      const stripe = await store.initializeStripe()
      const elements = stripe.elements()

      stripeCard.value = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      })

      stripeCard.value.mount(cardElement.value)
      stripeCard.value.on('change', (event) => {
        cardError.value = event.error ? event.error.message : ''
      })
    })

    onUnmounted(() => {
      if (stripeCard.value) {
        stripeCard.value.destroy()
      }
    })

    const handlePayment = async () => {
      // Clear previous errors
      amountError.value = ''

      // Validate amount
      if (!validateAmount(amount.value)) {
        return
      }

      if (!stripeCard.value) {
        $q.notify({
          type: 'negative',
          message: 'Payment system not initialized',
        })
        return
      }

      loading.value = true
      try {
        await store.processPayment({
          amount: Number(amount.value), // Ensure it's a number
          note: note.value,
          cardElement: stripeCard.value,
        })
        showSuccessDialog.value = true
      } catch (error) {
        paymentError.value = error.message
        showErrorDialog.value = true
        $q.notify({
          type: 'negative',
          message: error.message,
        })
      } finally {
        loading.value = false
      }
    }

    const handleSuccess = () => {
      showSuccessDialog.value = false
      emit('success')
    }

    return {
      cardElement,
      amount,
      amountError,
      note,
      loading,
      cardError,
      showSuccessDialog,
      showErrorDialog,
      paymentError,
      handlePayment,
      handleSuccess,
      validateAmount,
    }
  },
}
</script>

<style scoped>
.payment-form {
  max-width: 600px;
  margin: 0 auto;
}

.payment-card {
  border-radius: 8px;
}

.card-element {
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  background: white;
  transition: all 0.3s ease;
}

.card-element:hover {
  border-color: #9c9c9c;
}

.card-element-error {
  border-color: #c10015;
}

/* Add these styles to your CSS */
.StripeElement {
  height: 40px;
  padding: 10px 12px;
  width: 100%;
  color: #32325d;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
