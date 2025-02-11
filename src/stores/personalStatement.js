import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePersonalStatementStore = defineStore('personalStatement', {
  state: () => ({
    personalStatementData: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchPersonalStatement() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/personal-statement`)
        this.personalStatementData = response.data.data
        return this.personalStatementData
      } catch (error) {
        if (error.response?.status === 404) {
          this.personalStatementData = null
          return null
        }
        console.error('Error fetching personal statement:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async savePersonalStatement(data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const formattedData = {
          ...data,
          case_id: caseId,
        }

        let response

        if (this.personalStatementData) {
          response = await api.patch(`/api/auth/cases/${caseId}/personal-statement`, formattedData)
        } else {
          response = await api.post('/api/auth/cases/personal-statement', formattedData)
        }

        this.personalStatementData = response.data.data
        return response.data
      } catch (error) {
        console.error('Error saving personal statement:', error)
        throw error
      }
    },

    async deletePersonalStatement() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        await api.delete(`/api/auth/cases/${caseId}/personal-statement`)
        this.personalStatementData = null
      } catch (error) {
        console.error('Error deleting personal statement:', error)
        throw error
      }
    },
  },
})
