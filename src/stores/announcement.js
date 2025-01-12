// Using Pinia for state management
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [],
    loading: true,
    error: null,
  }),
  actions: {
    async fetchAnnouncements() {
      this.loading = true
      try {
        const response = await api.get('/api/auth/announcements')
        this.announcements = response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch announcements.'
      } finally {
        this.loading = false
      }
    },
  },
})
