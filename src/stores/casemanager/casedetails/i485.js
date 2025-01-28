import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useI485Store = defineStore('i485', {
  state: () => ({
    documents: [],
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchDocuments() {
      this.loading = true
      try {
        const response = await api.get(`/api/cases/${this.cases.data.id}/i485-documents`)
        this.documents = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async uploadDocument(formData) {
      this.loading = true
      try {
        const response = await api.post(
          `/api/cases/${this.cases.data.id}/i485-documents/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
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

    async downloadDocument(documentId) {
      try {
        const response = await api.get(
          `/api/cases/${this.cases.data.id}/i485-documents/${documentId}/download`,
          {
            responseType: 'blob',
            headers: {
              Accept: 'application/octet-stream',
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.data) {
          throw new Error('No data received from server')
        }

        const blob = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/octet-stream',
        })

        let filename = 'document'
        const disposition = response.headers['content-disposition']
        if (disposition && disposition.includes('filename')) {
          filename = disposition.split('filename=')[1].replace(/"/g, '')
        }

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename)
        } else {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          link.setAttribute('target', '_blank')
          document.body.appendChild(link)
          link.click()

          setTimeout(() => {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }, 100)
        }

        return true
      } catch (error) {
        console.error('Download error details:', error)
        throw error
      }
    },

    async downloadQuestionnaire() {
      try {
        const response = await api.get(
          `/api/cases/${this.cases.data.id}/i485-questionnaire/download`,
          {
            responseType: 'blob',
            headers: {
              Accept: 'application/octet-stream',
              'Content-Type': 'application/json',
            },
          },
        )

        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'I-485_Questionnaire.pdf')
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteDocument(documentId) {
      this.loading = true
      try {
        await api.delete(`/api/cases/${this.cases.data.id}/i485-documents/${documentId}`)
        return true
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
