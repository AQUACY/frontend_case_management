import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useExtraordinaryStore = defineStore('extraordinary', {
  state: () => ({
    extraordinaryData: null,
    awards: [],
    memberships: [],
    mediaCoverage: [],
    speakingEngagements: [],
    leadershipRoles: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    // Fetch all extraordinary ability data
    async fetchExtraordinary() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/extraordinary-ability`)
        this.extraordinaryData = response.data.data
        return this.extraordinaryData
      } catch (error) {
        if (error.response?.status === 404) {
          // If no record exists, return null
          this.extraordinaryData = null
          return null
        }
        console.error('Error fetching extraordinary ability:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Save or update extraordinary ability data
    async saveExtraordinary(data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const formattedData = {
          ...data,
          case_id: caseId,
          // Convert string 'Yes'/'No' to boolean
          has_awards: data.has_awards === 'Yes',
          has_memberships: data.has_memberships === 'Yes',
          has_media_coverage: data.has_media_coverage === 'Yes',
          has_speaking_engagements: data.has_speaking_engagements === 'Yes',
          has_leadership_roles: data.has_leadership_roles === 'Yes',
        }

        let response

        // Check if record exists by trying to fetch it first
        try {
          await this.fetchExtraordinary()
        } catch (error) {
          console.error('Error checking existing record:', error)
        }

        if (this.extraordinaryData) {
          // Update existing record
          response = await api.patch(
            `/api/auth/cases/${caseId}/extraordinary-ability`,
            formattedData,
          )
          console.log('Updated existing extraordinary ability record')
        } else {
          // Create new record
          response = await api.post('/api/auth/cases/extraordinary-ability', formattedData)
          console.log('Created new extraordinary ability record')
        }

        this.extraordinaryData = response.data.data
        return response.data
      } catch (error) {
        console.error('Error saving extraordinary ability:', error)
        throw error
      }
    },

    // Delete extraordinary ability record
    async deleteExtraordinary() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        await api.delete(`/api/auth/cases/${caseId}/extraordinary-ability`)
        this.extraordinaryData = null
      } catch (error) {
        console.error('Error deleting extraordinary ability:', error)
        throw error
      }
    },

    // Update component specific methods
    async updateComponent(type, id, data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        let endpoint = ''
        switch (type) {
          case 'award':
            endpoint = `/api/auth/cases/awards/${id}`
            break
          case 'membership':
            endpoint = `/api/auth/cases/memberships/${id}`
            break
          case 'media_coverage':
            endpoint = `/api/auth/cases/media-coverage/${id}`
            break
          case 'speaking_engagement':
            endpoint = `/api/auth/cases/speaking-engagements/${id}`
            break
          case 'leadership_role':
            endpoint = `/api/auth/cases/leadership-roles/${id}`
            break
          default:
            throw new Error('Invalid component type')
        }

        const response = await api.patch(endpoint, {
          ...data,
          case_id: caseId,
        })

        return response.data
      } catch (error) {
        console.error(`Error updating ${type}:`, error)
        throw error
      }
    },

    // Save new component
    async saveComponent(type, data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        let endpoint = ''
        switch (type) {
          case 'award':
            endpoint = '/api/auth/cases/awards'
            break
          case 'membership':
            endpoint = '/api/auth/cases/memberships'
            break
          case 'media_coverage':
            endpoint = '/api/auth/cases/media-coverage'
            break
          case 'speaking_engagement':
            endpoint = '/api/auth/cases/speaking-engagements'
            break
          case 'leadership_role':
            endpoint = '/api/auth/cases/leadership-roles'
            break
          default:
            throw new Error('Invalid component type')
        }

        const response = await api.post(endpoint, {
          ...data,
          case_id: caseId,
        })

        return response.data
      } catch (error) {
        console.error(`Error saving ${type}:`, error)
        throw error
      }
    },

    // Delete component
    async deleteComponent(type, id) {
      try {
        let endpoint = ''
        switch (type) {
          case 'award':
            endpoint = `/api/auth/cases/awards/${id}`
            break
          case 'membership':
            endpoint = `/api/auth/cases/memberships/${id}`
            break
          case 'media_coverage':
            endpoint = `/api/auth/cases/media-coverage/${id}`
            break
          case 'speaking_engagement':
            endpoint = `/api/auth/cases/speaking-engagements/${id}`
            break
          case 'leadership_role':
            endpoint = `/api/auth/cases/leadership-roles/${id}`
            break
          default:
            throw new Error('Invalid component type')
        }

        await api.delete(endpoint)
      } catch (error) {
        console.error(`Error deleting ${type}:`, error)
        throw error
      }
    },

    // Awards
    async fetchAwards() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/awards`)
        this.awards = response.data.data
        return this.awards
      } catch (error) {
        console.error('Error fetching awards:', error)
        throw error
      }
    },

    async saveAward(data) {
      try {
        const response = await api.post('/api/auth/cases/awards', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving award:', error)
        throw error
      }
    },

    async updateAward(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/awards/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating award:', error)
        throw error
      }
    },

    async deleteAward(id) {
      try {
        await api.delete(`/api/auth/cases/awards/${id}`)
      } catch (error) {
        console.error('Error deleting award:', error)
        throw error
      }
    },

    // Memberships
    async fetchMemberships() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/memberships`)
        this.memberships = response.data.data
        return this.memberships
      } catch (error) {
        console.error('Error fetching memberships:', error)
        throw error
      }
    },

    async saveMembership(data) {
      try {
        const response = await api.post('/api/auth/cases/memberships', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving membership:', error)
        throw error
      }
    },

    async updateMembership(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/memberships/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating membership:', error)
        throw error
      }
    },

    async deleteMembership(id) {
      try {
        await api.delete(`/api/auth/cases/memberships/${id}`)
      } catch (error) {
        console.error('Error deleting membership:', error)
        throw error
      }
    },

    // Media Coverage
    async fetchMediaCoverage() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/media-coverage`)
        this.mediaCoverage = response.data.data
        return this.mediaCoverage
      } catch (error) {
        console.error('Error fetching media coverage:', error)
        throw error
      }
    },

    async saveMediaCoverage(data) {
      try {
        const response = await api.post('/api/auth/cases/media-coverage', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving media coverage:', error)
        throw error
      }
    },

    async updateMediaCoverage(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/media-coverage/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating media coverage:', error)
        throw error
      }
    },

    async deleteMediaCoverage(id) {
      try {
        await api.delete(`/api/auth/cases/media-coverage/${id}`)
      } catch (error) {
        console.error('Error deleting media coverage:', error)
        throw error
      }
    },

    // Speaking Engagements
    async fetchSpeakingEngagements() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/speaking-engagements`)
        this.speakingEngagements = response.data.data
        return this.speakingEngagements
      } catch (error) {
        console.error('Error fetching speaking engagements:', error)
        throw error
      }
    },

    async saveSpeakingEngagement(data) {
      try {
        const response = await api.post('/api/auth/cases/speaking-engagements', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving speaking engagement:', error)
        throw error
      }
    },

    async updateSpeakingEngagement(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/speaking-engagements/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating speaking engagement:', error)
        throw error
      }
    },

    async deleteSpeakingEngagement(id) {
      try {
        await api.delete(`/api/auth/cases/speaking-engagements/${id}`)
      } catch (error) {
        console.error('Error deleting speaking engagement:', error)
        throw error
      }
    },

    // Leadership Roles
    async fetchLeadershipRoles() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/leadership-roles`)
        this.leadershipRoles = response.data.data
        return this.leadershipRoles
      } catch (error) {
        console.error('Error fetching leadership roles:', error)
        throw error
      }
    },

    async saveLeadershipRole(data) {
      try {
        const response = await api.post('/api/auth/cases/leadership-roles', {
          ...data,
          case_id: this.cases?.data?.id,
        })
        return response.data
      } catch (error) {
        console.error('Error saving leadership role:', error)
        throw error
      }
    },

    async updateLeadershipRole(id, data) {
      try {
        const response = await api.patch(`/api/auth/cases/leadership-roles/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating leadership role:', error)
        throw error
      }
    },

    async deleteLeadershipRole(id) {
      try {
        await api.delete(`/api/auth/cases/leadership-roles/${id}`)
      } catch (error) {
        console.error('Error deleting leadership role:', error)
        throw error
      }
    },
  },
})
