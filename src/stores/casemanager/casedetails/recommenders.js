import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
const $q = useQuasar()

export const useRecommendersStore = defineStore('recommenders', {
  state: () => ({
    recommenders: [],
    loading: false,
    error: null,
    caseId: JSON.parse(localStorage.getItem('caseDetails'))?.data?.id,
  }),

  actions: {
    async fetchRecommenders() {
      if (!this.caseId) {
        console.error('No case ID found')
        return
      }

      this.loading = true
      try {
        const response = await api.get(`/api/cases/${this.caseId}/recommenders`)
        this.recommenders = response.data.data
        return response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async addRecommender(payload) {
      this.loading = true
      try {
        const response = await api.post(`/api/cases/${this.caseId}/recommenders`, payload)
        await this.fetchRecommenders()
        return response.data
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: `Failed to add recommender. Please try again. ${error}`,
        })
      } finally {
        this.loading = false
      }
    },

    async updateRecommender(recommenderId, payload) {
      this.loading = true
      try {
        await api.patch(`/api/cases/${this.caseId}/recommenders/${recommenderId}`, payload)
        // Fetch fresh data after update
        await this.fetchRecommenders()
        return true
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    getRecommenders: (state) => state.recommenders,
    isLoading: (state) => state.loading,
  },
})
