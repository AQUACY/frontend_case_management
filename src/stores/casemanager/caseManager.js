import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCaseManagerStore = defineStore('caseManager', {
  state: () => ({
    allCases: [],
    activeCases: [],
    recentUpdates: [],
    loading: false,
    error: null,
    currentUser: JSON.parse(localStorage.getItem('user')), // Get logged in user
  }),

  actions: {
    async fetchAllCases() {
      this.loading = true
      try {
        const response = await api.get('/api/auth/casemanager/viewallcase')
        // Filter cases for current case manager
        this.allCases = response.data.data.data.filter(
          (caseItem) => caseItem.case_manager.id === this.currentUser.id,
        )
        return this.allCases
      } catch (error) {
        console.error('Error fetching cases:', error)
        this.error = error.response?.data?.message || 'Failed to fetch cases'
        throw error
      } finally {
        this.loading = false
      }
    },

    async getActiveCases() {
      // Filter active cases for current case manager
      return this.allCases.filter(
        (caseItem) =>
          caseItem.status === 'active' && caseItem.case_manager.id === this.currentUser.id,
      )
    },

    async getRecentUpdates() {
      // Get recent updates for current case manager's cases
      return [...this.allCases]
        .filter((caseItem) => caseItem.case_manager.id === this.currentUser.id)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5) // Get only the 5 most recent updates
    },
  },

  getters: {
    // All getters now automatically filter for current case manager
    totalCases: (state) => state.allCases.length,

    totalActiveCases: (state) =>
      state.allCases.filter(
        (c) => c.status === 'active' && c.case_manager.id === state.currentUser.id,
      ).length,

    urgentCases: (state) =>
      state.allCases.filter(
        (c) => c.priority === 'high' && c.case_manager.id === state.currentUser.id,
      ).length,

    pendingReviews: (state) =>
      state.allCases.filter(
        (c) => c.status === 'pending_review' && c.case_manager.id === state.currentUser.id,
      ).length,

    // New getter to check if a case belongs to current case manager
    isCaseManager: (state) => (caseId) => {
      const caseItem = state.allCases.find((c) => c.id === caseId)
      return caseItem?.case_manager.id === state.currentUser.id
    },
  },
})
