import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCaseStore = defineStore('case', {
  state: () => ({
    caseDetails: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCaseStatus() {
      this.loading = true
      try {
        const caseDetails = JSON.parse(localStorage.getItem('caseDetails'))
        const response = await api.get(`/api/cases/${caseDetails.data.id}/status`)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
