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
        console.log('Fetching publication records for case:', this.cases.data.id)
        const response = await api.get(`/api/auth/cases/${this.cases.data.id}/publication-records`)
        console.log('Fetched publication records:', response.data)
        this.publicationRecords = response.data.data
        return response.data
      } catch (error) {
        console.error('Error fetching publication records:', error)
        this.error = error.message || 'Failed to fetch publication records'
        throw error
      } finally {
        this.loading = false
      }
    },

    async savePublicationRecords(payload) {
      this.loading = true
      try {
        const response = await api.post(
          `/api/auth/cases/${this.cases.data.id}/publication-records`,
          payload,
        )
        // Update local state after successful save
        this.publicationRecords = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to save publication records'
        throw error
      } finally {
        this.loading = false
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
