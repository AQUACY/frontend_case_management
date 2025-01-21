import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAdditionalQualificationStore = defineStore('additionalQualification', {
  state: () => ({
    qualificationData: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchQualification() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/additional-qualification/${this.cases.data.id}`)

        // Convert numeric boolean values to actual booleans
        const booleanFields = [
          'nationally_internationally_recognized_awards',
          'peer_review',
          'phd_committee',
          'grant_review',
          'leadership_roles',
          'notable_memberships',
          'notable_media_coverage',
          'invitations',
          'filing_eb1a',
          'no_achievement_for_eb1a',
        ]

        booleanFields.forEach((field) => {
          if (response.data[field] !== null) {
            response.data[field] = Boolean(Number(response.data[field]))
          }
        })

        this.qualificationData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to fetch qualification data'
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveQualification(data) {
      this.loading = true
      try {
        // Convert boolean values to 0/1 for API
        const booleanFields = [
          'nationally_internationally_recognized_awards',
          'peer_review',
          'phd_committee',
          'grant_review',
          'leadership_roles',
          'notable_memberships',
          'notable_media_coverage',
          'invitations',
          'filing_eb1a',
          'no_achievement_for_eb1a',
        ]

        const formattedData = {
          ...data,
          ...booleanFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: data[field] ? 1 : 0,
            }),
            {},
          ),
        }

        const response = await api.post(
          `/api/auth/additional-qualification/${this.cases.data.id}`,
          formattedData,
        )

        // Convert numeric boolean values back to actual booleans in response
        booleanFields.forEach((field) => {
          if (response.data[field] !== null) {
            response.data[field] = Boolean(Number(response.data[field]))
          }
        })

        this.qualificationData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to save qualification data'
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
    getData: (state) => state.qualificationData,
  },
})
