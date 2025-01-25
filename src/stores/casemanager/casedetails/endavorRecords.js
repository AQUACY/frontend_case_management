import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useEndavorRecordsStore = defineStore('endavorRecords', {
  state: () => ({
    record: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchEndavorRecord() {
      this.loading = true
      try {
        const response = await api.get(`/api/auth/cases/${this.cases.data.id}/getendavorrecords`)

        // Parse the type field if it's a string
        if (response.data.record && typeof response.data.record.type === 'string') {
          try {
            response.data.record.type = JSON.parse(response.data.record.type)
          } catch (e) {
            response.data.record.type = []
            console.log(e)
          }
        }

        this.record = response.data.record
        return response.data.record
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async requestReview() {
      this.loading = true
      try {
        const response = await api.post(
          `/api/auth/request-review/${this.cases.data.id}/request-review`,
          this.record,
        )
        return response.data
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveEndavorRecord(data) {
      this.loading = true
      try {
        // Ensure type is an array
        const formattedData = {
          ...data,
          // Send type directly as an array
          type: Array.isArray(data.type) ? data.type : [],
        }

        const response = await api.post(
          `/api/auth/cases/${this.cases.data.id}/addendavorrecords`,
          formattedData,
        )

        // Parse the type field in the response
        if (response.data.record && typeof response.data.record.type === 'string') {
          try {
            response.data.record.type = JSON.parse(response.data.record.type)
          } catch (e) {
            response.data.record.type = []
            console.log(e)
          }
        }

        this.record = response.data.record
        return response.data.record
      } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
