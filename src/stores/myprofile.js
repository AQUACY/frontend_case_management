// Using Pinia for state management
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useMyProfile = defineStore('myprofile', {
  state: () => ({
    profile: [],
    loading: true,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),
  actions: {
    async fetchMyProfile() {
      this.loading = true
      try {
        const response = await api.get(`/api/cases/${this.cases.data.id}/profile`)
        this.profile = response.data
        console.log(this.profile)
      } catch (error) {
        this.error = error.message || 'Failed to fetch announcements.'
      } finally {
        this.loading = false
      }
    },
  },
})
