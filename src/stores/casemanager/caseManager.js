import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCaseManagerStore = defineStore('caseManager', {
  state: () => ({
    allCases: [],
    activeCases: [],
    recentUpdates: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllCases() {
      this.loading = true
      try {
        const response = await api.get('/api/auth/casemanager/viewallcase')
        this.allCases = response.data.data.data
        console.log(this.allCases)
        return response.data.data.data
      } catch (error) {
        console.error('Error fetching cases:', error)
        this.error = error.response?.data?.message || 'Failed to fetch cases'
        throw error
      } finally {
        this.loading = false
      }
    },

    async getActiveCases() {
      return this.allCases.filter((caseItem) => caseItem.status === 'active')
    },

    async getRecentUpdates() {
      // Sort cases by updated_at date
      return [...this.allCases]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5) // Get only the 5 most recent updates
    },
  },

  getters: {
    totalCases: (state) => state.allCases.length,
    totalActiveCases: (state) => state.allCases.filter((c) => c.status === 'active').length,
    urgentCases: (state) => state.allCases.filter((c) => c.priority === 'high').length,
    pendingReviews: (state) => state.allCases.filter((c) => c.status === 'pending_review').length,
  },
})
