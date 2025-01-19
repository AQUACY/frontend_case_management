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
        // Parse dates if they exist
        if (response.data) {
          const dateFields = ['dob', 'arrival_date', 'passport_expiration_date', 'admit_until_date']
          dateFields.forEach((field) => {
            if (response.data.data[field]) {
              response.data.data[field] = response.data.data[field].split('T')[0]
            }
          })

          // Parse family member dates
          if (response.data.data.family_members) {
            response.data.data.family_members = response.data.data.family_members.map((member) => ({
              ...member,
              dob: member.dob ? member.dob.split('T')[0] : null,
            }))
          }
        }

        this.questionnaireData = response.data.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveQuestionnaire(data) {
      this.loading = true
      try {
        // Convert boolean strings to actual booleans
        const booleanFields = [
          'dual_citizenship',
          'full_time_position',
          'permanent_position',
          'new_position',
          'apply_visa_abroad',
          'file_adjustment_status',
          'simultaneous_petitions',
          'prior_petition',
          'removal_proceedings',
        ]

        const formattedData = {
          ...data,
          ...booleanFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: data[field] === 'Yes' ? true : data[field] === 'No' ? false : null,
            }),
            {},
          ),
        }

        const response = await api.post(
          `/api/auth/cases/${this.cases.data.id}/questionnaire`,
          formattedData,
        )
        this.questionnaireData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
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
