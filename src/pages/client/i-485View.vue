<template>
  <q-page class="q-pa-md">
    <!-- Contracts and Questionnaire Section -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Contracts and Questionnaire</div>
      </q-card-section>

      <!-- Download General Documents Section -->
      <q-card-section>
        <div class="row items-center q-mb-md">
          <q-icon name="download" color="green" size="sm" class="q-mr-sm" />
          <div class="text-green text-weight-medium">Download General Documents</div>
        </div>
        <div class="q-pl-md">
          Please click
          <a href="#" class="text-primary" @click.prevent="downloadQuestionnaire">here</a>
          for the I-485 Evaluation Questionnaire
        </div>
      </q-card-section>

      <!-- I-485 Contracts and Questionnaire Section -->
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">I-485 Contracts and Questionnaire</div>
          <q-btn color="green-10" label="Upload" @click="triggerFileUpload" />
        </div>

        <!-- Document List -->
        <div v-if="documents.length > 0">
          <div v-for="doc in documents" :key="doc.id" class="q-my-sm">
            <div class="row items-center justify-between">
              <div>
                <q-icon name="insert_drive_file" class="q-mr-sm" />
                <a
                  href="#"
                  class="text-primary cursor-pointer"
                  style="text-decoration: none"
                  @click.prevent="downloadDocument(doc)"
                >
                  {{ doc.filename }}
                </a>
                <div class="text-caption text-grey">
                  {{ formatDate(doc.created_at) }}
                </div>
              </div>
              <q-btn flat round color="negative" icon="delete" @click="deleteDocument(doc.id)" />
            </div>
          </div>
        </div>
        <div v-else class="text-grey text-center q-pa-md">No Documents</div>
      </q-card-section>
    </q-card>

    <!-- Upload Dialog -->
    <q-dialog v-model="uploadDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">Upload I-485 Document</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <div>
              <div class="text-subtitle2">1. Choose a document:</div>
              <q-file
                v-model="selectedFile"
                outlined
                label="Choose File"
                :error="!!fileError"
                :error-message="fileError"
              />
            </div>

            <div>
              <div class="text-subtitle2">2. Name the document:</div>
              <q-input
                v-model="documentName"
                outlined
                label="Document Name"
                :error="!!nameError"
                :error-message="nameError"
              />
            </div>

            <div>
              <div class="text-subtitle2">3. Note (optional):</div>
              <q-input
                v-model="documentNote"
                type="textarea"
                outlined
                label="Please briefly explain the document uploaded."
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section class="text-caption text-grey">
          Notes: Maximum upload file size: 128MB.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Upload" @click="handleUpload" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { useI485Store } from 'src/stores/i485'

export default {
  name: 'I485View',

  setup() {
    const store = useI485Store()
    const $q = useQuasar()
    const loading = ref(false)
    const documents = ref([])
    const uploadDialog = ref(false)
    const selectedFile = ref(null)
    const documentName = ref('')
    const documentNote = ref('')
    const fileError = ref('')
    const nameError = ref('')

    onMounted(async () => {
      try {
        await fetchDocuments()
      } catch (error) {
        console.error('Error loading documents:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load documents',
        })
      }
    })

    const fetchDocuments = async () => {
      try {
        const response = await store.fetchDocuments()
        documents.value = response
      } catch (error) {
        console.log(error)
      }
    }

    const triggerFileUpload = () => {
      resetUploadForm()
      uploadDialog.value = true
    }

    const resetUploadForm = () => {
      selectedFile.value = null
      documentName.value = ''
      documentNote.value = ''
      fileError.value = ''
      nameError.value = ''
    }

    const handleUpload = async () => {
      if (!validateForm()) return

      loading.value = true
      try {
        const formData = new FormData()
        formData.append('document', selectedFile.value)
        formData.append('name', documentName.value)
        formData.append('note', documentNote.value || '')

        await store.uploadDocument(formData)
        await fetchDocuments()

        $q.notify({
          type: 'positive',
          message: 'Document uploaded successfully',
        })
        uploadDialog.value = false
        resetUploadForm()
      } catch (error) {
        console.error('Upload error:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.error || 'Failed to upload document',
        })
      } finally {
        loading.value = false
      }
    }

    const validateForm = () => {
      let isValid = true
      fileError.value = ''
      nameError.value = ''

      if (!selectedFile.value) {
        fileError.value = 'Please select a file'
        isValid = false
      }

      if (!documentName.value) {
        nameError.value = 'Please enter a document name'
        isValid = false
      }

      return isValid
    }

    const downloadQuestionnaire = async () => {
      try {
        await store.downloadQuestionnaire()
      } catch (error) {
        console.error('Download error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to download questionnaire',
        })
      }
    }

    const downloadDocument = async (doc) => {
      try {
        loading.value = true
        $q.notify({
          type: 'ongoing',
          message: 'Downloading document...',
          timeout: 0,
        })

        await store.downloadDocument(doc.id)

        $q.notify({
          type: 'positive',
          message: 'Download complete',
          timeout: 1000,
        })
      } catch (error) {
        console.error('Download error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to download document',
        })
      } finally {
        loading.value = false
      }
    }

    const deleteDocument = async (documentId) => {
      try {
        await store.deleteDocument(documentId)
        await fetchDocuments()
        $q.notify({
          type: 'positive',
          message: 'Document deleted successfully',
        })
      } catch (error) {
        console.error('Delete error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete document',
        })
      }
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'YYYY-MM-DD HH:mm:ss')
    }

    return {
      documents,
      loading,
      uploadDialog,
      selectedFile,
      documentName,
      documentNote,
      fileError,
      nameError,
      triggerFileUpload,
      handleUpload,
      downloadQuestionnaire,
      downloadDocument,
      deleteDocument,
      formatDate,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
