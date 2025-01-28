import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCaseManagerStore = defineStore('caseManager', {
  state: () => {
    return {
      // Make sure all properties are initialized with proper types
      cases: [],
      pendingQuestionnaires: 0,
      pendingMessages: 0,
      pendingEdavors: 0,
      totalCases: 0,
      totalActiveCases: 0,
      loading: false,
      error: null,
    }
  },

  actions: {
    async fetchPendingItems() {
      this.loading = true
      try {
        // Fetch pending questionnaires
        const questionnaireResponse = await api.get('/api/auth/cases/questionnaire')
        this.pendingQuestionnaires = questionnaireResponse?.data?.data?.length || 0

        // Fetch pending endavor reviews
        const endavorResponse = await api.get('/api/auth/cases/proposed-employment-endavors')
        this.pendingEdavors = endavorResponse?.data?.data?.length || 0

        // Fetch pending messages
        // const messagesResponse = await api.get('/api/cases/messages')
        // this.pendingMessages = messagesResponse?.data?.length || 0
      } catch (error) {
        console.error('Error fetching pending items:', error)
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchAllCases() {
      this.loading = true
      try {
        const response = await api.get('/api/auth/casemanager/viewallcase')
        const cases = response.data?.data?.data || []

        // Update the cases array
        this.cases = cases

        // Update the counts
        this.totalCases = cases.length
        this.totalActiveCases = Array.isArray(cases)
          ? cases.filter((c) => c.status === 'active').length
          : 0

        return cases
      } catch (error) {
        console.error('Error fetching all cases:', error)
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    },

    resetPendingCounts() {
      this.pendingQuestionnaires = 0
      this.pendingMessages = 0
      this.pendingEdavors = 0
      this.totalCases = 0
      this.totalActiveCases = 0
      this.cases = []
      this.error = null
    },
  },

  getters: {
    hasPendingItems: (state) => {
      return (
        state.pendingQuestionnaires > 0 || state.pendingMessages > 0 || state.pendingEdavors > 0
      )
    },

    isLoading: (state) => state.loading,

    hasError: (state) => state.error !== null,
  },
})
