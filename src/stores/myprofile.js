// Using Pinia for state management
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useMyProfile = defineStore('myprofile', {
  state: () => ({
    profile: {},
    loading: true,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),
  actions: {
    async fetchMyProfile() {
      this.loading = true
      try {
        const response = await api.get(`/api/cases/${this.cases.data.id}/profile`)
        this.profile = response.data.data
        console.log(this.profile)
      } catch (error) {
        this.error = error.message || 'Failed to fetch profile.'
      } finally {
        this.loading = false
      }
    },

    async saveProfile(profileData) {
      this.loading = true
      try {
        const response = await api.post(`/api/cases/${this.cases.data.id}/profile`, profileData)
        this.profile = response.data.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to save profile.'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
