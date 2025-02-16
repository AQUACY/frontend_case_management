import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useResearchStore = defineStore('research', {
  state: () => ({
    researchSummary: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchResearchSummary() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/research-summary`)
        this.researchSummary = response.data.data
        return this.researchSummary
      } catch (error) {
        console.error('Error fetching research summary:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveResearchSummary(data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const formattedData = {
          ...data,
          case_id: caseId,
        }

        const response = await api.post('/api/auth/cases/research-summary', formattedData)
        return response.data
      } catch (error) {
        console.error('Error saving research summary:', error)
        throw error
      }
    },

    async updateResearchSummary(data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.patch(`/api/auth/cases/${caseId}/research-summary`, data)
        return response.data
      } catch (error) {
        console.error('Error updating research summary:', error)
        throw error
      }
    },

    async deleteResearchSummary() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        await api.delete(`/api/auth/cases/${caseId}/research-summary`)
      } catch (error) {
        console.error('Error deleting research summary:', error)
        throw error
      }
    },
  },
})
