import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: {
      'My CV': [],
      'My List of Recommenders': [],
      'My Citation Report': [],
    },
    loading: false,
    error: null,
    cases: JSON.parse(localStorage.getItem('caseDetails')),
  }),

  actions: {
    async fetchDocuments() {
      this.loading = true
      try {
        console.log('Fetching documents for case:', this.cases.data.id)
        const response = await api.get(`/api/cases/${this.cases.data.id}/documents`)
        console.log('Raw response data:', response.data.documents)

        // Check if response.data is an array
        const documents = Array.isArray(response.data.documents) ? response.data.documents : []

        // Group documents by category
        const groupedDocs = documents.reduce((acc, doc) => {
          // Get category name based on category_id
          let categoryName = 'My CV'
          switch (doc.category_id) {
            case 1:
              categoryName = 'My CV'
              break
            case 2:
              categoryName = 'My List of Recommenders'
              break
            case 3:
              categoryName = 'My Citation Report'
              break
            default:
              categoryName = 'Other'
          }

          if (!acc[categoryName]) {
            acc[categoryName] = []
          }
          acc[categoryName].push({
            ...doc,
            filename: doc.name || doc.filename, // Handle different property names
            created_at: doc.created_at || doc.upload_date, // Handle different date formats
          })
          return acc
        }, {})

        console.log('Grouped documents:', groupedDocs)

        // Merge with existing categories
        this.documents = {
          'My CV': groupedDocs['My CV'] || [],
          'My List of Recommenders': groupedDocs['My List of Recommenders'] || [],
          'My Citation Report': groupedDocs['My Citation Report'] || [],
        }

        return response.data
      } catch (error) {
        console.error('Error in fetchDocuments:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async uploadDocument(formData) {
      this.loading = true
      try {
        console.log('Uploading document with formData:', {
          category_id: formData.get('category_id'),
          case_id: formData.get('case_id'),
          name: formData.get('name'),
          note: formData.get('note'),
        })

        const response = await api.post(
          `/api/cases/${this.cases.data.id}/documents/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        // Refresh documents after successful upload
        await this.fetchDocuments()
        return response.data
      } catch (error) {
        console.error('Upload error details:', error.response?.data)
        this.error = error.response?.data?.error || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteDocument(documentId) {
      this.loading = true
      try {
        await api.delete(`/api/cases/${this.cases.data.id}/documents/${documentId}`)
        // Update local state after successful deletion
        await this.fetchDocuments()
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
          `/api/cases/${this.cases.data.id}/documents/${documentId}/download`,
          {
            responseType: 'blob', // Important for file downloads
            headers: {
              Accept: 'application/octet-stream',
              'Content-Type': 'application/json',
            },
          },
        )

        // Check if response is valid
        if (!response.data) {
          throw new Error('No data received from server')
        }

        // Create object URL from blob
        const blob = new Blob([response.data], {
          type: response.headers['content-type'] || 'application/octet-stream',
        })

        // Get filename from headers or use default
        let filename = 'document'
        const disposition = response.headers['content-disposition']
        if (disposition && disposition.includes('filename')) {
          filename = disposition.split('filename=')[1].replace(/"/g, '')
        }

        // Use download attribute with iframe for better compatibility
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // For IE
          window.navigator.msSaveOrOpenBlob(blob, filename)
        } else {
          // For modern browsers
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          link.setAttribute('target', '_blank')
          document.body.appendChild(link)
          link.click()

          // Cleanup
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
  },

  getters: {
    getDocumentsByCategory: (state) => (category) => state.documents[category] || [],
  },
})
