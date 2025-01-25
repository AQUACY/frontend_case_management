import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useContributionsStore = defineStore('contributions', {
  state: () => ({
    contributionsList: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchContributions() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/case/contributions/${this.cases.data.id}`)
        // Ensure we always have an array, even if API returns a single object
        this.contributionsList = Array.isArray(response.data)
          ? response.data
          : [response.data].filter(Boolean)
        console.log('this.contributionsList', this.contributionsList)
        return this.contributionsList
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to fetch contributions'
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveContribution(data) {
      this.loading = true
      try {
        const endpoint = `/api/auth/case/contributions/${this.cases.data.id}`
        const method = 'post'

        const formattedData = {
          ...data,
          case_id: this.cases.data.id,
          status: data.status || 'pending', // Ensure status is set for new contributions
        }

        const response = await api[method](endpoint, formattedData)

        // Update the contributions list
        if (data.id) {
          const index = this.contributionsList.findIndex((c) => c.id === data.id)
          if (index !== -1) {
            this.contributionsList[index] = response.data
          }
        } else {
          this.contributionsList.unshift(response.data) // Add new contributions at the start
        }

        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to save contribution'
        throw error
      } finally {
        this.loading = false
      }
    },

    async requestReview(contributionId) {
      this.loading = true
      try {
        const response = await api.post(
          `/api/auth/request-review/${this.cases.data.id}/request-review`,
          {
            contribution_id: contributionId,
          },
        )

        // Update the contribution status in the list
        const index = this.contributionsList.findIndex((c) => c.id === contributionId)
        if (index !== -1) {
          this.contributionsList[index] = {
            ...this.contributionsList[index],
            ...response.data,
            status: 'under_review',
          }
        }

        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to request review'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    resetState() {
      this.contributionsList = []
      this.loading = false
      this.error = null
    },
  },

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    errorMessage: (state) => state.error,
    getContributions: (state) => state.contributionsList,
    getPendingContributions: (state) =>
      state.contributionsList.filter((c) => c.status === 'pending'),
    getReviewedContributions: (state) =>
      state.contributionsList.filter((c) => c.status !== 'pending'),
  },
})
