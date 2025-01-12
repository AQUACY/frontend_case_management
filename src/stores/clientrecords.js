// Using Pinia for state management
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCaseStore = defineStore('clientrecords', {
  state: () => ({
    crecords: [],
    loading: true,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),
  actions: {
    async fetchClientRecords() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/client-records/${this.cases.data.id}`)
        this.crecords = response.data
        console.log(this.crecords)
      } catch (error) {
        this.error = error.message || 'Failed to fetch announcements.'
      } finally {
        this.loading = false
      }
    },
  },
})
