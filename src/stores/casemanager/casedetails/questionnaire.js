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

        // Parse dates
        if (response.data) {
          const dateFields = ['dob', 'arrival_date', 'passport_expiration_date', 'admit_until_date']
          dateFields.forEach((field) => {
            if (response.data[field]) {
              response.data[field] = response.data[field].split('T')[0]
            }
          })

          // Convert boolean values to Yes/No for enum fields
          const enumFields = [
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

          enumFields.forEach((field) => {
            if (response.data[field] !== null) {
              response.data[field] = response.data[field] ? 'Yes' : 'No'
            }
          })

          // Parse family member dates
          if (response.data.family_members) {
            response.data.family_members = response.data.family_members.map((member) => ({
              ...member,
              dob: member.dob ? member.dob.split('T')[0] : null,
            }))
          }
        }

        this.questionnaireData = response.data
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
        // Define enum fields
        const enumFields = [
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

        // Format family members data
        const formattedFamilyMembers =
          data.family_members?.map((member) => {
            const formattedMember = {
              family_name: member.family_name,
              given_name: member.given_name,
              full_middle_name: member.full_middle_name,
              relationship: member.relationship,
              dob: member.dob,
              birth_country: member.birth_country,
              adjustment_status: member.adjustment_status,
              immigrant_visa: member.immigrant_visa,
            }

            // Only include id if it exists (for updates)
            if (member.id) {
              formattedMember.id = member.id
            }

            return formattedMember
          }) || []

        // Create formatted data with enum values and formatted family members
        const formattedData = {
          ...data,
          ...enumFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: data[field] || null,
            }),
            {},
          ),
          family_members: formattedFamilyMembers,
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
        // Format family members data
        const formattedFamilyMembers =
          data.family_members?.map((member) => {
            const formattedMember = {
              family_name: member.family_name,
              given_name: member.given_name,
              full_middle_name: member.full_middle_name,
              relationship: member.relationship,
              dob: member.dob,
              birth_country: member.birth_country,
              adjustment_status: member.adjustment_status,
              immigrant_visa: member.immigrant_visa,
            }

            // Only include id if it exists (for updates)
            if (member.id) {
              formattedMember.id = member.id
            }

            return formattedMember
          }) || []

        const formattedData = {
          ...data,
          family_members: formattedFamilyMembers,
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

    async deleteFamilyMember(questionnaireId, familyMemberId) {
      this.loading = true
      try {
        const response = await api.delete(
          `/api/auth/case-questionnaires/case/${questionnaireId}/${familyMemberId}/delete`,
        )

        // Update local state by removing the family member
        if (this.questionnaireData && this.questionnaireData.family_members) {
          this.questionnaireData.family_members = this.questionnaireData.family_members.filter(
            (member) => member.id !== familyMemberId,
          )
        }

        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
