import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useQuestionnaireStore = defineStore('questionnaire', {
  state: () => ({
    questionnaireData: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchQuestionnaire() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/cases/questionnaire/${this.cases.data.id}`)
        this.questionnaireData = response.data.data
        // console.log(response.data.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveQuestionnaire(data) {
      this.loading = true
      try {
        const payload = {
          ...data,
          user_id: this.cases.data.user_id,
          case_id: this.cases.data.id,
        }

        const response = await api.post(
          `/api/auth/cases/questionnaire/${this.cases.data.id}`,
          payload,
        )
        this.questionnaireData = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateQuestionnaire(data) {
      this.loading = true
      try {
        const payload = {
          ...data,
          user_id: this.cases.data.user_id,
          case_id: this.cases.data.id,
        }

        const response = await api.put(
          `/api/auth/cases/${this.cases.data.id}/questionnaire`,
          payload,
        )
        this.questionnaireData = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
