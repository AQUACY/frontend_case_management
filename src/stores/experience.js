import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    education: [],
    workExperience: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    // Education Actions
    async fetchEducation() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/education`)
        this.education = response.data.data || []
        return this.education
      } catch (error) {
        console.error('Error fetching education:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveEducation(data) {
      try {
        const response = await api.post('/api/auth/cases/education', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving education:', error)
        throw error
      }
    },

    async updateEducation(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/education/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating education:', error)
        throw error
      }
    },

    async deleteEducation(id) {
      try {
        await api.delete(`/api/auth/cases/education/${id}`)
      } catch (error) {
        console.error('Error deleting education:', error)
        throw error
      }
    },

    // Work Experience Actions
    async fetchWorkExperience() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/work-experience`)
        this.workExperience = response.data.data || []
        return this.workExperience
      } catch (error) {
        console.error('Error fetching work experience:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveWorkExperience(data) {
      try {
        const response = await api.post('/api/auth/cases/work-experience', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving work experience:', error)
        throw error
      }
    },

    async updateWorkExperience(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/work-experience/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating work experience:', error)
        throw error
      }
    },

    async deleteWorkExperience(id) {
      try {
        await api.delete(`/api/auth/cases/work-experience/${id}`)
      } catch (error) {
        console.error('Error deleting work experience:', error)
        throw error
      }
    },
  },
})
