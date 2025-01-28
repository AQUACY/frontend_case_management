// Using Pinia for state management
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useClientRecordsStore = defineStore('clientRecords', {
  state: () => ({
    clientData: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Format data before sending to API
    formatPayload(data) {
      // Ensure petition_types is a plain array of strings
      let petition_types = []
      if (Array.isArray(data.petition_types)) {
        petition_types = data.petition_types
      } else if (typeof data.petition_types === 'string') {
        try {
          petition_types = JSON.parse(data.petition_types)
        } catch (e) {
          petition_types = []
          console.log(e)
        }
      }

      return {
        ...data,
        case_id: this.route.params.id,
        // Send as a plain array - let the backend handle the JSON encoding
        petition_types: petition_types,
        has_dependents: Boolean(data.has_dependents),
        in_us: Boolean(data.in_us),
        full_time: Boolean(data.full_time),
        permanent_position: Boolean(data.permanent_position),
        applying_new_visa: Boolean(data.applying_new_visa),
        j_visa_status: Boolean(data.j_visa_status),
        communist_party_member: Boolean(data.communist_party_member),
        asylum_applied: Boolean(data.asylum_applied),
        no_passport_applied: Boolean(data.no_passport_applied),
        dependents: Array.isArray(data.dependents)
          ? data.dependents.map((dep) => ({
              ...dep,
              no_passport_applied: Boolean(dep.no_passport_applied),
            }))
          : [],
      }
    },

    // async saveClientRecord(data) {
    //   this.loading = true
    //   try {
    //     const formattedData = this.formatPayload(data)
    //     console.log('Sending Data:', formattedData) // For debugging
    //     const response = await api.post(
    //       `/api/auth/client-records/${this.cases.data.id}/add`,
    //       formattedData,
    //     )
    //     this.clientData = response.data
    //     return response.data
    //   } catch (error) {
    //     console.error('API Error:', error.response?.data || error)
    //     throw new Error(error.response?.data?.message || 'Error saving record')
    //   } finally {
    //     this.loading = false
    //   }
    // },

    async fetchClientRecord(data) {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/client-records/${data}`)
        // Parse petition_types if it's a string when receiving data
        console.log('this is the data for client records', response.data)
        if (response.data && typeof response.data.petition_types === 'string') {
          try {
            response.data.petition_types = JSON.parse(response.data.petition_types)
          } catch (e) {
            response.data.petition_types = []
            console.log(e)
          }
        }
        this.clientData = response.data
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw new Error(error.response?.data?.message || 'Error fetching record')
      } finally {
        this.loading = false
      }
    },

    // async updateClientRecord(data) {
    //   this.loading = true
    //   try {
    //     // const formattedData = this.formatPayload(data)
    //     console.log('Sending Update Data:', data) // For debugging
    //     const response = await api.post(`/api/auth/client-records/${this.cases.data.id}/add`, data)
    //     this.clientData = response.data
    //     return response.data
    //   } catch (error) {
    //     console.error('API Error:', error.response?.data || error)
    //     throw new Error(error.response?.data?.message || 'Error updating record')
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async removeDependent(clientRecordId, dependentId) {
    //   this.loading = true
    //   try {
    //     const response = await api.delete(
    //       `/api/auth/client-records/${clientRecordId}/dependents/${dependentId}`,
    //     )

    //     // Update the local state by removing the dependent
    //     if (this.clientData && this.clientData.dependents) {
    //       this.clientData.dependents = this.clientData.dependents.filter(
    //         (dep) => dep.id !== dependentId,
    //       )
    //     }

    //     return response.data
    //   } catch (error) {
    //     console.error('API Error:', error.response?.data || error)
    //     throw new Error(error.response?.data?.message || 'Error removing dependent')
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
})
