import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePublicationRecordsStore = defineStore('publicationRecords', {
  state: () => ({
    publicationRecords: null,
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchPublicationRecords() {
      this.loading = true
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const response = await api.get(`/api/auth/cases/${caseId}/publication-records`)
        this.publicationRecords = response.data.data
        return this.publicationRecords
      } catch (error) {
        console.error('Error fetching publication records:', error)
        if (error.response?.status === 404) {
          this.publicationRecords = null
          return null
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async savePublicationRecords(data) {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        const formattedData = {
          ...data,
          case_id: caseId,
        }

        let response
       
          // Update existing record
          response = await api.post(`/api/auth/cases/${caseId}/publication-records`, formattedData)
      

        this.publicationRecords = response.data.data
        return response.data
      } catch (error) {
        console.error('Error saving publication records:', error)
        throw error
      }
    },

    async deletePublicationRecords() {
      try {
        const caseId = this.cases?.data?.id
        if (!caseId) throw new Error('No case ID found')

        await api.delete(`/api/auth/cases/${caseId}/publication-records`)
        this.publicationRecords = null
      } catch (error) {
        console.error('Error deleting publication records:', error)
        throw error
      }
    },

    // Helper method to format the payload
    formatPublicationPayload(formData) {
      return {
        peer_reviewed_journal_articles: parseInt(formData.peer_reviewed_journal_articles) || 0,
        notes_peer_reviewed_journal: formData.notes_peer_reviewed_journal || '',
        peer_reviewed_conference_articles:
          parseInt(formData.peer_reviewed_conference_articles) || 0,
        notes_peer_reviewed_conference: formData.notes_peer_reviewed_conference || '',
        conference_abstracts: parseInt(formData.conference_abstracts) || 0,
        notes_conference_abstracts: formData.notes_conference_abstracts || '',
        pre_prints: parseInt(formData.pre_prints) || 0,
        notes_pre_prints: formData.notes_pre_prints || '',
        book_chapters: parseInt(formData.book_chapters) || 0,
        notes_book_chapters: formData.notes_book_chapters || '',
        books: parseInt(formData.books) || 0,
        notes_books: formData.notes_books || '',
        technical_reports: parseInt(formData.technical_reports) || 0,
        notes_technical_reports: formData.notes_technical_reports || '',
        granted_patents: parseInt(formData.granted_patents) || 0,
        notes_granted_patents: formData.notes_granted_patents || '',
        others: formData.others || '',
        in_preparation_manuscripts: formData.in_preparation_manuscripts || '',
        research_topic: formData.research_topic || '',
        significance: formData.significance || '',
        funding_sources: formData.funding_sources || '',
      }
    },
  },

  getters: {
    hasPublicationRecords: (state) => !!state.publicationRecords,
    getPublicationRecords: (state) => state.publicationRecords || {},
    isLoading: (state) => state.loading,
  },
})
