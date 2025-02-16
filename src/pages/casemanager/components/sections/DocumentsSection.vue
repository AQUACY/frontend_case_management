<template>
  <div class="documents-section q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <!-- Document Category Selector -->
        <div class="row q-mb-xl">
          <div class="col-12">
            <q-select
              v-model="selectedCategory"
              :options="categoryOptions"
              label="Category"
              outlined
              dense
              class="category-select"
            />
          </div>
        </div>

        <!-- Add this after the category selector -->
        <div class="row q-mb-md">
          <div class="col-12">
            <q-btn
              color="primary"
              icon="upload_file"
              label="Upload Team Document"
              @click="showUploadDialog = true"
            />
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center q-pa-md">
          <q-spinner color="green" size="2em" />
          <div class="text-grey q-mt-sm">Loading documents...</div>
        </div>

        <!-- Documents Display -->
        <template v-else>
          <div v-for="(docs, category) in groupedDocuments" :key="category" class="q-mb-xl">
            <template v-if="!selectedCategory || selectedCategory === category">
              <div class="text-h6 q-mb-md">{{ category }}</div>

              <div class="row q-col-gutter-md">
                <div v-for="doc in docs" :key="doc.id" class="col-12 col-md-6">
                  <q-card class="document-card cursor-pointer" @click="downloadDocument(doc)">
                    <q-card-section>
                      <div class="row items-center no-wrap">
                        <div class="col">
                          <div class="row items-center">
                            <q-icon
                              :name="getFileIcon(doc.file_type)"
                              size="md"
                              color="green"
                              class="q-mr-sm"
                            />
                            <div>
                              <div class="text-subtitle1">{{ doc.name }}</div>
                              <div class="text-caption text-grey">
                                Uploaded: {{ formatDate(doc.created_at) }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-auto">
                          <q-btn
                            flat
                            round
                            color="green"
                            icon="download"
                            @click.stop="downloadDocument(doc)"
                          >
                            <q-tooltip>Download Document</q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </template>
          </div>

          <!-- Empty State -->
          <div v-if="Object.keys(groupedDocuments).length === 0" class="text-center q-pa-xl">
            <q-icon name="folder_open" size="4em" color="grey-4" />
            <div class="text-h6 text-grey q-mt-md">No documents available</div>
          </div>
        </template>
      </q-card-section>
    </q-card>

    <!-- Add this upload dialog -->
    <q-dialog v-model="showUploadDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6">Upload Team Document</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <!-- File Upload -->
            <div class="col-12">
              <q-file
                v-model="selectedFile"
                label="Select File"
                outlined
                dense
                bottom-slots
                counter
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                :rules="[
                  (val) => !!val || 'File is required',
                  (val) => !val || val.size <= 20480000 || 'File size must be less than 20MB',
                  (val) =>
                    !val ||
                    acceptedFileTypes.includes(val.name.split('.').pop().toLowerCase()) ||
                    'Invalid file type',
                ]"
                @update:model-value="onFileSelected"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
                <template v-slot:append v-if="selectedFile">
                  <q-icon name="close" @click.stop="selectedFile = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                  Accepted formats: PDF, DOC, DOCX, PPT, PPTX (Max: 20MB)
                </template>
              </q-file>
            </div>

            <!-- Document Name -->
            <div class="col-12">
              <q-input
                v-model="documentName"
                label="Document Name"
                outlined
                dense
                :rules="[
                  (val) => !!val || 'Document name is required',
                  (val) => val.length <= 255 || 'Name must be less than 255 characters',
                ]"
                :disable="!selectedFile"
              />
            </div>

            <!-- Document Note -->
            <div class="col-12">
              <q-input
                v-model="documentNote"
                label="Document Note"
                type="textarea"
                outlined
                dense
                :disable="!selectedFile"
                autogrow
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn
            flat
            label="Upload"
            color="primary"
            :loading="uploading"
            :disable="!selectedFile"
            @click="uploadDocument"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'DocumentsSection',

  props: {
    caseId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar()
    const loading = ref(false)
    const documents = ref([])
    const selectedCategory = ref(null)
    const showUploadDialog = ref(false)
    const selectedFile = ref(null)
    const documentName = ref('')
    const documentNote = ref('')
    const uploading = ref(false)

    const categoryOptions = [
      'All Documents',
      'Personal Documents',
      'Academic Records',
      'Professional Documents',
      'Immigration Forms',
      'Reference Letters',
      'Publications',
      'Citations',
    ]

    const acceptedFileTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx']

    const groupedDocuments = computed(() => {
      const grouped = {}
      documents.value.forEach((doc) => {
        if (!grouped[doc.category]) {
          grouped[doc.category] = []
        }
        grouped[doc.category].push(doc)
      })
      return grouped
    })

    const getFileIcon = (fileType) => {
      const icons = {
        pdf: 'picture_as_pdf',
        doc: 'description',
        docx: 'description',
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        default: 'insert_drive_file',
      }
      return icons[fileType] || icons.default
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const fetchDocuments = async () => {
      loading.value = true
      try {
        const response = await api.get(`/api/cases/${props.caseId}/documents`)
        documents.value = response.data.documents
      } catch (error) {
        console.error('Error fetching documents:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load documents',
        })
      } finally {
        loading.value = false
      }
    }

    const downloadDocument = async (doc) => {
      try {
        const response = await api.get(`/api/cases/${props.caseId}/documents/${doc.id}/download`, {
          responseType: 'blob',
        })

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', doc.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        $q.notify({
          type: 'positive',
          message: 'Document downloaded successfully',
        })
      } catch (error) {
        console.error('Download error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to download document',
        })
      }
    }

    const validateFile = (file) => {
      if (!file) return 'File is required'

      // Check file size (20MB = 20480000 bytes)
      if (file.size > 20480000) {
        return 'File size must be less than 20MB'
      }

      // Check file type
      const fileType = file.name.split('.').pop().toLowerCase()
      if (!acceptedFileTypes.includes(fileType)) {
        return `Invalid file type. Accepted formats: ${acceptedFileTypes.join(', ')}`
      }

      return true
    }

    const uploadDocument = async () => {
      if (!selectedFile.value || !documentName.value) {
        $q.notify({
          type: 'negative',
          message: 'Please fill in all required fields',
        })
        return
      }

      // Validate file before upload
      const fileValidation = validateFile(selectedFile.value)
      if (fileValidation !== true) {
        $q.notify({
          type: 'negative',
          message: fileValidation,
        })
        return
      }

      uploading.value = true
      const formData = new FormData()

      try {
        formData.append('document', selectedFile.value)
        formData.append('category_id', 11) // Team category ID
        formData.append('name', documentName.value.trim())
        formData.append('additional_notes', documentNote.value?.trim() || '')

        await api.post(`/api/cases/${props.caseId}/documents/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        $q.notify({
          type: 'positive',
          message: 'Document uploaded successfully',
        })

        // Reset form
        selectedFile.value = null
        documentName.value = ''
        documentNote.value = ''
        showUploadDialog.value = false

        // Refresh documents list
        await fetchDocuments()
      } catch (error) {
        console.error('Upload error:', error)
        let errorMessage = 'Failed to upload document'

        // Handle validation errors from backend
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0]
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
        }

        $q.notify({
          type: 'negative',
          message: errorMessage,
        })
      } finally {
        uploading.value = false
      }
    }

    const onFileSelected = (file) => {
      if (file) {
        // Validate file immediately on selection
        const fileValidation = validateFile(file)
        if (fileValidation !== true) {
          $q.notify({
            type: 'warning',
            message: fileValidation,
          })
          selectedFile.value = null
          return
        }

        // Set default document name from file name (without extension)
        documentName.value = file.name.split('.').slice(0, -1).join('.')
      }
    }

    onMounted(() => {
      fetchDocuments()
    })

    return {
      loading,
      documents,
      selectedCategory,
      categoryOptions,
      groupedDocuments,
      getFileIcon,
      formatDate,
      downloadDocument,
      showUploadDialog,
      selectedFile,
      documentName,
      documentNote,
      uploading,
      onFileSelected,
      uploadDocument,
      acceptedFileTypes,
      validateFile,
    }
  },
}
</script>

<style lang="scss" scoped>
.documents-section {
  .category-select {
    max-width: 400px;
  }

  .document-card {
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .text-subtitle1 {
    font-size: 1.1rem;
    line-height: 1.2;
  }
}
</style>
