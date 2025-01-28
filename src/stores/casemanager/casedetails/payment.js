import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { loadStripe } from '@stripe/stripe-js'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
    stripeInstance: null,
  }),

  actions: {
    async initializeStripe() {
      if (!this.stripeInstance) {
        this.stripeInstance = await loadStripe(process.env.STRIPE_PUBLIC_KEY)
      }
      return this.stripeInstance
    },

    async processPayment({ amount, note = '', cardElement }) {
      this.loading = true
      try {
        // Ensure amount is a valid number and convert to number type
        const numericAmount = parseFloat(amount)
        if (isNaN(numericAmount) || numericAmount <= 0) {
          throw new Error('Invalid amount')
        }

        // Create the payment intent with the validated amount
        const paymentData = {
          amount: numericAmount,
          case_id: this.cases.data.id,
          note: note || '',
        }

        console.log('Sending payment data:', paymentData) // Debug log

        const response = await api.post(`/api/auth/payment/${this.cases.data.id}`, paymentData)

        const { clientSecret } = response.data
        const stripe = await this.initializeStripe()

        // Confirm the payment with the card element
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: this.cases.data.client_name || 'Client',
            },
          },
        })

        if (result.error) {
          throw new Error(result.error.message)
        }

        // Handle success callback
        await api.post(`/api/auth/process-payment/${this.cases.data.id}`, {
          payment_intent_id: result.paymentIntent.id,
        })

        return result.paymentIntent
      } catch (error) {
        console.error('Payment Error:', error.response?.data || error)
        throw new Error(error.response?.data?.error || error.message)
      } finally {
        this.loading = false
      }
    },
  },
})
