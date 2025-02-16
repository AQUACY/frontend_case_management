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
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/questionnaire/${caseId}`)

        if (response.data.success) {
          const questionnaireData = response.data.data
          console.log('Questionnaire data:', questionnaireData)

          // Parse dates
          const dateFields = [
            'dob',
            'last_arrival_date',
            'expiration_date',
            'expiration_date_for_passport',
          ]

          dateFields.forEach((field) => {
            if (questionnaireData[field]) {
              questionnaireData[field] = questionnaireData[field].split('T')[0]
            }
          })

          // Convert boolean values
          const booleanFields = [
            'alien_will_apply_for_visa_abroad',
            'alien_in_us',
            'full_time_position',
            'permanent_position',
            'new_position',
          ]

          booleanFields.forEach((field) => {
            if (questionnaireData[field] !== null) {
              questionnaireData[field] = questionnaireData[field] ? 'Yes' : 'No'
            }
          })

          // Parse family member dates
          if (questionnaireData.family_members) {
            questionnaireData.family_members = questionnaireData.family_members.map((member) => ({
              ...member,
              dob: member.dob ? member.dob.split('T')[0] : null,
            }))
          }

          this.questionnaireData = questionnaireData
          return questionnaireData
        }

        throw new Error(response.data.message || 'Failed to fetch questionnaire')
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
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        // Format boolean fields
        const booleanFields = [
          'alien_will_apply_for_visa_abroad',
          'alien_in_us',
          'full_time_position',
          'permanent_position',
          'new_position',
        ]

        // Clean and format the data
        const formattedData = {
          ...data,
          user_id: this.cases.data.user_id,
          case_id: caseId,
        }

        // Format string fields
        const stringFields = [
          'petition_type',
          'petitioner',
          'family_name',
          'given_name',
          'full_middle_name',
          'native_alphabet',
          'city_town_village_of_birth',
          'state_of_birth',
          'country_of_birth',
          'nationality',
          'alien_registration_number',
          'ssn',
          'worksite_type',
          'city_town',
          'state',
          'zip_code',
          'country',
          'mobile_telephone',
          'email_address',
        ]

        stringFields.forEach((field) => {
          if (formattedData[field]) {
            formattedData[field] = String(formattedData[field]).trim()
          }
        })

        // Format boolean fields - set to true for 'Yes', null for 'No'
        booleanFields.forEach((field) => {
          if (field in formattedData) {
            const value = formattedData[field]
            formattedData[field] = value === true || value === 'Yes' || value === 1 ? true : null
          }
        })

        // Log boolean values for debugging
        console.log(
          'Boolean field values after formatting:',
          booleanFields.reduce(
            (acc, field) => ({
              ...acc,
              [field]: formattedData[field],
            }),
            {},
          ),
        )

        // Rest of the formatting logic remains the same
        const numericFields = ['annual_income', 'hours_per_week', 'wages']
        numericFields.forEach((field) => {
          if (formattedData[field]) {
            formattedData[field] = Number(formattedData[field]) || null
          }
        })

        const dateFields = [
          'dob',
          'last_arrival_date',
          'expiration_date',
          'expiration_date_for_passport',
        ]
        dateFields.forEach((field) => {
          if (formattedData[field]) {
            const date = new Date(formattedData[field])
            formattedData[field] = date.toISOString().split('T')[0]
          }
        })

        // Format family members with correct field names and validation
        if (formattedData.family_members?.length) {
          // Debug log before formatting
          console.log('Raw family members data:', formattedData.family_members)

          formattedData.family_members = formattedData.family_members
            .filter((member) => {
              // Only include members that have the required fields
              const isValid =
                member.family_name_last_name &&
                member.given_name_first_name &&
                member.relationship &&
                member.dob &&
                member.birth_country

              if (!isValid) {
                console.log('Filtered out incomplete member:', member)
              }
              return isValid
            })
            .map((member) => {
              const formattedMember = {
                id: member.id || undefined,
                case_questionnaire_id: formattedData.id,
                family_name_last_name: String(member.family_name_last_name).trim(),
                given_name_first_name: String(member.given_name_first_name).trim(),
                middle_name: member.middle_name ? String(member.middle_name).trim() : null,
                relationship: String(member.relationship).trim(),
                dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : null,
                birth_country: String(member.birth_country).trim(),
                adjustment_status: member.adjustment_status === 'Yes',
                visa_abroad: member.visa_abroad === 'Yes',
              }
              console.log('Formatted member:', formattedMember)
              return formattedMember
            })

          // Log the final formatted family members
          console.log('Final formatted family members:', formattedData.family_members)
        } else {
          console.log('No family members to process')
        }

        // Remove empty values (but keep null values for booleans)
        Object.keys(formattedData).forEach((key) => {
          if (
            formattedData[key] === undefined ||
            (formattedData[key] === null && !booleanFields.includes(key)) ||
            formattedData[key] === ''
          ) {
            delete formattedData[key]
          }
        })

        console.log('Final formatted data:', formattedData)

        const response = await api.post(`/api/auth/cases/${caseId}/questionnaire`, formattedData)

        if (response.data.data) {
          this.questionnaireData = response.data.data
          return response.data.data
        }

        throw new Error(response.data.message || 'Failed to save questionnaire')
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async requestReview() {
      try {
        const questionnaireId = this.questionnaireData?.id
        if (!questionnaireId) throw new Error('No questionnaire ID found')

        const response = await api.post(
          `/api/auth/case-questionnaire/${questionnaireId}/request-review`,
        )
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      }
    },

    async deleteFamilyMember(familyMemberId) {
      try {
        const questionnaireId = this.questionnaireData?.id
        if (!questionnaireId) throw new Error('No questionnaire ID found')

        const response = await api.delete(
          `/api/auth/case-questionnaires/case/${questionnaireId}/${familyMemberId}/delete`,
        )

        if (response.data.message) {
          // Update local state
          this.questionnaireData.family_members = this.questionnaireData.family_members.filter(
            (member) => member.id !== familyMemberId,
          )
          return response.data
        }

        throw new Error(response.data.message || 'Failed to delete family member')
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      }
    },
  },
})
