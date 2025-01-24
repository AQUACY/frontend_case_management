import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePaymentHistoryStore = defineStore('paymentHistory', {
  state: () => ({
    payments: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchPayments() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/payment/${this.cases.data.id}`)
        this.payments = Array.isArray(response.data.payments)
          ? response.data.payments
          : [response.data.payments]
        return this.payments
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to fetch payments'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    errorMessage: (state) => state.error,
    getPayments: (state) => state.payments,
    getTotalSuccessfulPayments: (state) => {
      return state.payments
        .filter((payment) => payment.status === 'succeeded')
        .reduce((total, payment) => total + parseFloat(payment.amount), 0)
    },
    getCaseBilling: (state) => {
      return parseFloat(state.cases.data.bill || 0)
    },
    getRemainingBalance: (state) => {
      const totalBill = parseFloat(state.cases.data.bill || 0)
      const totalPaid = state.payments
        .filter((payment) => payment.status === 'succeeded')
        .reduce((total, payment) => total + parseFloat(payment.amount), 0)
      return totalBill - totalPaid
    },
    isFullyPaid: (state) => {
      const totalBill = parseFloat(state.cases.data.bill || 0)
      const totalPaid = state.payments
        .filter((payment) => payment.status === 'succeeded')
        .reduce((total, payment) => total + parseFloat(payment.amount), 0)
      return totalPaid >= totalBill
    },
  },
})
