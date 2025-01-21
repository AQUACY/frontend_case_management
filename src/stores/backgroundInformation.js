import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useBackgroundInformationStore = defineStore('backgroundInformation', {
  state: () => ({
    backgroundData: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchBackgroundInformation() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/background-information/${this.cases.data.id}`)
        this.backgroundData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to fetch background information'
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveBackgroundInformation(data) {
      this.loading = true
      try {
        const formattedData = {
          main_academic_field: data.main_academic_field || null,
          specialization: data.specialization || null,
          unique_skillset: data.unique_skillset || null,
          filing_niw: data.filing_niw || 'no',
          critical_discussion_1: data.critical_discussion_1 || null,
          critical_discussion_2: data.critical_discussion_2 || null,
          critical_discussion_3: data.critical_discussion_3 || null,
          key_issue_1: data.key_issue_1 || null,
          key_issue_2: data.key_issue_2 || null,
          key_issue_2_discussion_field_1: data.key_issue_2_discussion_field_1 || null,
          key_issue_2_discussion_field_2: data.key_issue_2_discussion_field_2 || null,
          key_issue_3: data.key_issue_3 || null,
          key_issue_3_discussion_field_1: data.key_issue_3_discussion_field_1 || null,
          key_issue_3_discussion_field_2: data.key_issue_3_discussion_field_2 || null,
          benefit_us_issue_1: data.benefit_us_issue_1 || null,
          benefit_us_issue_1_discussion_field_1: data.benefit_us_issue_1_discussion_field_1 || null,
          benefit_us_issue_1_discussion_field_2: data.benefit_us_issue_1_discussion_field_2 || null,
          benefit_us_issue_2: data.benefit_us_issue_2 || null,
          benefit_us_issue_2_discussion_field_1: data.benefit_us_issue_2_discussion_field_1 || null,
          benefit_us_issue_2_discussion_field_2: data.benefit_us_issue_2_discussion_field_2 || null,
          benefit_us_issue_3: data.benefit_us_issue_3 || null,
          benefit_us_issue_3_discussion_field_1: data.benefit_us_issue_3_discussion_field_1 || null,
          benefit_us_issue_3_discussion_field_2: data.benefit_us_issue_3_discussion_field_2 || null,
        }

        const response = await api.post(
          `/api/auth/background-information/${this.cases.data.id}`,
          formattedData,
        )

        this.backgroundData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Failed to save background information'
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
    getData: (state) => state.backgroundData,
  },
})
