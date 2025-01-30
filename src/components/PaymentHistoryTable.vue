<template>
  <div class="payment-history">
    <!-- Summary Cards Row -->
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- Total Bill Card -->
      <div class="col-12 col-sm-4">
        <q-card flat bordered class="bg-blue-1">
          <q-card-section class="q-pa-sm">
            <div class="row items-center">
              <q-icon name="receipt_long" size="md" color="green" class="q-mr-sm" />
              <div>
                <div class="text-caption">Total Bill</div>
                <div class="text-h6 text-green">${{ formatAmount(store.getCaseBilling) }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Total Paid Card -->
      <div class="col-12 col-sm-4">
        <q-card flat bordered class="bg-positive-1">
          <q-card-section class="q-pa-sm">
            <div class="row items-center">
              <q-icon name="payments" size="md" color="positive" class="q-mr-sm" />
              <div>
                <div class="text-caption">Total Paid</div>
                <div class="text-h6 text-positive">
                  ${{ formatAmount(store.getTotalSuccessfulPayments) }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Remaining Balance Card -->
      <div class="col-12 col-sm-4">
        <q-card flat bordered :class="store.isFullyPaid ? 'bg-positive-1' : 'bg-warning-1'">
          <q-card-section class="q-pa-sm">
            <div class="row items-center">
              <q-icon
                :name="store.isFullyPaid ? 'check_circle' : 'account_balance'"
                size="md"
                :color="store.isFullyPaid ? 'positive' : 'warning'"
                class="q-mr-sm"
              />
              <div>
                <div class="text-caption">
                  {{ store.isFullyPaid ? 'Fully Paid' : 'Remaining Balance' }}
                </div>
                <div class="text-h6" :class="store.isFullyPaid ? 'text-positive' : 'text-warning'">
                  {{ store.isFullyPaid ? 'PAID' : '$' + formatAmount(store.getRemainingBalance) }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-h6 q-mb-md">Payment History</div>

    <!-- Loading State -->
    <div v-if="store.isLoading" class="text-center q-pa-md">
      <q-spinner color="green" size="3em" />
      <div class="text-grey q-mt-sm">Loading payment history...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="store.hasError" class="text-center text-negative q-pa-md">
      {{ store.errorMessage }}
      <q-btn flat color="green" label="Retry" @click="fetchData" class="q-mt-sm" />
    </div>

    <!-- Data Table -->
    <q-table
      v-else
      :rows="store.getPayments"
      :columns="columns"
      row-key="id"
      :loading="store.isLoading"
      flat
      bordered
    >
      <!-- Custom Column Slots -->
      <template v-slot:body-cell-amount="props">
        <q-td :props="props"> ${{ parseFloat(props.row.amount).toFixed(2) }} </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip :color="getStatusColor(props.row.status)" text-color="white" size="sm">
            {{ props.row.status }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-payment_date="props">
        <q-td :props="props">
          {{ formatDate(props.row.payment_date) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            size="sm"
            color="green"
            icon="receipt_long"
            @click="showDetails(props.row)"
          >
            <q-tooltip>View Details</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <!-- No Data Message -->
      <template v-slot:no-data>
        <div class="text-center q-pa-md text-grey">No payment history available</div>
      </template>
    </q-table>

    <!-- Payment Details Dialog -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">Payment Details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section v-if="selectedPayment">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="text-subtitle2">Transaction ID</div>
              <div>{{ selectedPayment.transaction_id }}</div>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">Amount</div>
              <div>${{ parseFloat(selectedPayment.amount).toFixed(2) }}</div>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">Status</div>
              <q-chip :color="getStatusColor(selectedPayment.status)" text-color="white" size="sm">
                {{ selectedPayment.status }}
              </q-chip>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">Payment Date</div>
              <div>{{ formatDate(selectedPayment.payment_date) }}</div>
            </div>
            <div class="col-12" v-if="selectedPayment.note">
              <div class="text-subtitle2">Note</div>
              <div>{{ selectedPayment.note }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Show payment form only if not fully paid -->
    <div v-if="!store.isFullyPaid" class="q-mt-lg">
      <PaymentForm @success="fetchData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { usePaymentHistoryStore } from 'src/stores/paymentHistory'
import PaymentForm from './PaymentForm.vue'

export default {
  name: 'PaymentHistoryTable',

  components: {
    PaymentForm,
  },

  setup() {
    const store = usePaymentHistoryStore()
    const showDialog = ref(false)
    const selectedPayment = ref(null)

    const columns = [
      {
        name: 'transaction_id',
        label: 'Transaction ID',
        field: 'transaction_id',
        align: 'left',
      },
      {
        name: 'amount',
        label: 'Amount',
        field: 'amount',
        align: 'right',
      },
      {
        name: 'status',
        label: 'Status',
        field: 'status',
        align: 'center',
      },
      {
        name: 'payment_date',
        label: 'Payment Date',
        field: 'payment_date',
        align: 'left',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
      },
    ]

    const getStatusColor = (status) => {
      const colors = {
        pending: 'orange',
        succeeded: 'positive',
        failed: 'negative',
        default: 'grey',
      }
      return colors[status] || colors.default
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMMM D, YYYY HH:mm')
    }

    const formatAmount = (amount) => {
      return parseFloat(amount)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const showDetails = (payment) => {
      selectedPayment.value = payment
      showDialog.value = true
    }

    const fetchData = async () => {
      try {
        await store.fetchPayments()
        console.log('payments', store.payments)
      } catch (error) {
        console.error('Failed to fetch payments:', error)
      }
    }

    onMounted(fetchData)

    return {
      store,
      columns,
      showDialog,
      selectedPayment,
      getStatusColor,
      formatDate,
      formatAmount,
      showDetails,
      fetchData,
    }
  },
}
</script>

<style scoped>
.payment-history {
  max-width: 1200px;
  margin: 0 auto;
}

.bg-positive-1 {
  background: rgba(21, 187, 90, 0.1);
}

.bg-warning-1 {
  background: rgba(255, 152, 0, 0.1);
}

.bg-blue-1 {
  background: rgba(25, 118, 210, 0.1);
}

.q-table__card {
  box-shadow: none;
}
</style>
