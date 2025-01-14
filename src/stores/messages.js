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
        if (response.data.success) {
          this.messages = response.data.messages
          return response.data.messages
        }
        throw new Error('Failed to fetch messages')
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
        if (response.data.success) {
          return response.data
        }
        throw new Error('Failed to send message')
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
        if (response.data.success) {
          return response.data
        }
        throw new Error('Failed to rate message')
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
