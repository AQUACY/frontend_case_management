import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCasesStore = defineStore('cases', {
  state: () => ({
    cases: [],
    currentCase: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      status: null,
      type: null,
      date: null,
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    },
  }),

  getters: {
    // Get all cases
    getAllCases: (state) => state.cases,

    // Get filtered cases
    getFilteredCases: (state) => {
      let filtered = [...state.cases]

      // Apply search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase()
        filtered = filtered.filter(
          (caseItem) =>
            caseItem.client.toLowerCase().includes(searchTerm) ||
            caseItem.id.toLowerCase().includes(searchTerm) ||
            caseItem.type.toLowerCase().includes(searchTerm),
        )
      }

      // Apply status filter
      if (state.filters.status) {
        filtered = filtered.filter((caseItem) => caseItem.status === state.filters.status)
      }

      // Apply type filter
      if (state.filters.type) {
        filtered = filtered.filter((caseItem) => caseItem.type === state.filters.type)
      }

      // Apply date filter
      if (state.filters.date) {
        filtered = filtered.filter((caseItem) => caseItem.date === state.filters.date)
      }

      return filtered
    },

    // Get case types for filter options
    getCaseTypes: (state) => {
      const types = new Set(state.cases.map((caseItem) => caseItem.type))
      return Array.from(types)
    },

    // Get case statuses for filter options
    getCaseStatuses: (state) => {
      const statuses = new Set(state.cases.map((caseItem) => caseItem.status))
      return Array.from(statuses)
    },

    // Get loading state
    isLoading: (state) => state.loading,

    // Get error state
    hasError: (state) => !!state.error,

    // Get error message
    errorMessage: (state) => state.error,
  },

  actions: {
    // Fetch all cases assigned to the case manager
    async fetchCases() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/api/auth/casemanager/viewallcase')
        this.cases = response.data.data.data
        this.pagination.rowsNumber = this.cases.length
      } catch (error) {
        console.error('Error fetching cases:', error)
        this.error = error.response?.data?.message || 'Failed to fetch cases'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Set current case
    setCurrentCase(caseId) {
      this.currentCase = this.cases.find((c) => c.id === caseId) || null
    },

    // Update filters
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    },

    // Update pagination
    updatePagination(newPagination) {
      this.pagination = { ...this.pagination, ...newPagination }
    },

    // Reset filters
    resetFilters() {
      this.filters = {
        search: '',
        status: null,
        type: null,
        date: null,
      }
    },

    // Clear error
    clearError() {
      this.error = null
    },

    // Fetch case details
    async fetchCaseDetails(caseId) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/api/auth/viewcase/${caseId}`)
        this.currentCase = response.data.data
        console.log(this.currentCase)
      } catch (error) {
        console.error('Error fetching case details:', error)
        this.error = error.response?.data?.message || 'Failed to fetch case details'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
