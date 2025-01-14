import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchMessages() {
      this.loading = true
      try {
        const response = await api.get(`/api/cases/${this.cases.data.id}/messages`)
        this.messages = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async sendMessage(payload) {
      this.loading = true
      try {
        const response = await api.post(`/api/cases/${this.cases.data.id}/messages`, payload)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async rateMessage(messageId, rating) {
      this.loading = true
      try {
        const response = await api.post(
          `/api/cases/${this.cases.data.id}/messages/${messageId}/rate`,
          {
            rating,
          },
        )
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
