<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-lg text-green">Documents</div>

    <!-- Category Selection -->
    <div class="row q-mb-md">
      <div class="col-12 q-mb-lg">
        <q-select v-model="selectedCategory" :options="categoryOptions" label="Category" outlined />
      </div>
    </div>

    <!-- Document Sections -->
    <div class="document-sections q-gutter-y-md">
      <!-- My CV Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">My CV</div>
            <q-btn color="green-10" label="Upload" @click="triggerFileUpload('My CV')" />
          </div>
          <div class="text-caption text-grey">
            Please make sure the CV is updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div v-for="doc in getDocuments('My CV')" :key="doc.id" class="q-my-sm">
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
        </q-card-section>
      </q-card>

      <!-- My List of Recommenders Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">My List of Recommenders</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('My List of Recommenders')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure "List of Recommenders" is updated during the whole preparation process.
            We will draft reference letters based on this updated document.
          </div>
        </q-card-section>

        <q-card-section>
          <div v-for="doc in getDocuments('My List of Recommenders')" :key="doc.id" class="q-my-sm">
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
        </q-card-section>
      </q-card>

      <!-- My Citation Report Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">My Citation Report</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('My Citation Report')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Citation Report is updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div v-for="doc in getDocuments('My Citation Report')" :key="doc.id" class="q-my-sm">
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
        </q-card-section>
      </q-card>

      <!-- My Employment-Related Documents Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">My Employment-Related Documents</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('My Employment-Related Documents')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Employment-Related Documents are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('My Employment-Related Documents')"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- My Degree-Related Documents Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">My Degree-Related Documents</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('My Degree-Related Documents')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Degree-Related Documents are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('My Degree-Related Documents')"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- Identity Documents and Forms Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">Identity Documents and Forms</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('Identity Documents and Forms')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Identity Documents and Forms are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('Identity Documents and Forms')"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- Signed Letters and Recommenders CVs Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">Signed Letters and Recommenders CVs</div>

            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('Signed Letters and Recommenders CVs')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Signed Letters and Recommenders CVs are updated before we file your
            case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('Signed Letters and Recommenders CVs')"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- Additional Documents Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">Additional Documents</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('Additional Documents')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Additional Documents are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div v-for="doc in getDocuments('Additional Documents')" :key="doc.id" class="q-my-sm">
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
        </q-card-section>
      </q-card>

      <!-- Approved Letters and Recommenders CVs (to be used in Petition Letter) Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">
              Approved Letters and Recommenders CVs (to be used in Petition Letter)
            </div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="
                triggerFileUpload(
                  'Approved Letters and Recommenders CVs (to be used in Petition Letter)',
                )
              "
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Approved Letters and Recommenders CVs (to be used in Petition
            Letter) are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments(
              'Approved Letters and Recommenders CVs (to be used in Petition Letter)',
            )"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- Drafted Documents Revised by Customers Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">Drafted Documents Revised by Customers</div>
            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('Drafted Documents Revised by Customers')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the Drafted Documents Revised by Customers are updated before we file
            your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('Drafted Documents Revised by Customers')"
            :key="doc.id"
            class="q-my-sm"
          >
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
        </q-card-section>
      </q-card>

      <!-- Drafted Documents by Our Team Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">Drafted Documents by Our Team</div>
            <!-- <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('Drafted Documents by Our Team')"
            /> -->
          </div>
          <div class="text-caption text-grey">
            Please make sure the Drafted Documents by Our Team are updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="doc in getDocuments('Drafted Documents by Our Team')"
            :key="doc.id"
            class="q-my-sm"
          >
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
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- USCIS Notice Section -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">USCIS Notice Section</div>

            <q-btn
              color="green-10"
              label="Upload"
              @click="triggerFileUpload('USCIS Notice Section')"
            />
          </div>
          <div class="text-caption text-grey">
            Please make sure the USCIS Notice Section is updated before we file your case.
          </div>
        </q-card-section>

        <q-card-section>
          <div v-for="doc in getDocuments('USCIS Notice Section')" :key="doc.id" class="q-my-sm">
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
        </q-card-section>
      </q-card>
    </div>

    <!-- Upload Dialog -->
    <q-dialog v-model="uploadDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">Upload documents to {{ currentUploadCategory }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <!-- File Selection -->
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

            <!-- Document Type -->
            <div>
              <div class="text-subtitle2">2. Select document type:</div>
              <q-input v-model="documentType" outlined :value="currentUploadCategory" readonly />
            </div>

            <!-- Document Name -->
            <div>
              <div class="text-subtitle2">3. Name the document:</div>
              <q-input
                v-model="documentName"
                outlined
                label="Document Name"
                :error="!!nameError"
                :error-message="nameError"
              />
            </div>

            <!-- Optional Note -->
            <div>
              <div class="text-subtitle2">4. Note (optional):</div>
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

        <q-card-section class="text-caption text-red">
          Whenever uploading documents, please always send a message separately to alert us. We will
          not know about your upload(s) unless we receive a message. Thank you!
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Upload" @click="handleUpload" :loading="uploading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDocumentsStore } from 'src/stores/documents'
import { useQuasar } from 'quasar'
import { date } from 'quasar'

export default {
  name: 'DocumentView',

  setup() {
    const store = useDocumentsStore()
    const $q = useQuasar()
    const uploadDialog = ref(false)
    const selectedFile = ref(null)
    const documentType = ref('')
    const documentName = ref('')
    const documentNote = ref('')
    const currentUploadCategory = ref('')
    const uploading = ref(false)
    const fileError = ref('')
    const nameError = ref('')
    const loading = ref(false)

    const categoryOptions = [
      'My CV',
      'My List of Recommenders',
      'My Citation Report',
      'My Employment-Related Documents',
      'My Degree-Related Documents',
      'Identity Documents and Forms',
      'Signed Letters and Recommenders CVs',
      'Additional Documents',
      'Approved Letters and Recommenders CVs (to be used in Petition Letter)',
      'Drafted Documents Revised by Customers',
      'Drafted Documents by Our Team',
      'USCIS Notice Section',
    ]

    // Update category mapping with proper IDs
    const categoryIds = {
      'My CV': 1,
      'My List of Recommenders': 2,
      'My Citation Report': 3,
      'My Employment-Related Documents': 4,
      'My Degree-Related Documents': 5,
      'Identity Documents and Forms': 6,
      'Signed Letters and Recommenders CVs': 7,
      'Additional Documents': 8,
      'Approved Letters and Recommenders CVs (to be used in Petition Letter)': 9,
      'Drafted Documents Revised by Customers': 10,
      'Drafted Documents by Our Team': 11,
      'USCIS Notice Section': 12,
    }

    onMounted(async () => {
      try {
        await store.fetchDocuments()
      } catch (error) {
        console.error('Error fetching documents:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load documents',
        })
      }
    })

    const triggerFileUpload = (category) => {
      currentUploadCategory.value = category
      documentType.value = category
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

      // Validate case_id
      if (!store.cases?.data?.id) {
        $q.notify({
          type: 'negative',
          message: 'Case ID is missing',
        })
        isValid = false
      }

      // Validate category_id
      if (!categoryIds[currentUploadCategory.value]) {
        $q.notify({
          type: 'negative',
          message: 'Invalid category selected',
        })
        isValid = false
      }

      return isValid
    }

    const handleUpload = async () => {
      if (!validateForm()) return

      uploading.value = true
      try {
        // Get the correct category ID based on the selected category
        const categoryId = categoryIds[currentUploadCategory.value]

        console.log('Uploading for category:', currentUploadCategory.value, 'with ID:', categoryId)

        const formData = new FormData()
        formData.append('document', selectedFile.value) // The file
        formData.append('category_id', categoryId) // Category ID
        formData.append('case_id', store.cases.data.id) // Case ID
        formData.append('name', documentName.value || selectedFile.value.name) // Use file name if document name is empty
        formData.append('note', documentNote.value || '') // Optional note

        // Log the FormData contents for debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1])
        }

        await store.uploadDocument(formData)

        $q.notify({
          type: 'positive',
          message: 'Document uploaded successfully',
        })
        uploadDialog.value = false
        resetUploadForm()
      } catch (error) {
        console.error('Upload error:', error)
        // Show more detailed error message
        $q.notify({
          type: 'negative',
          message: error.response?.data?.error || 'Failed to upload document',
        })
      } finally {
        uploading.value = false
      }
    }

    const deleteDocument = async (documentId) => {
      try {
        await store.deleteDocument(documentId)
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

    const getDocuments = (category) => {
      return store.getDocumentsByCategory(category)
    }

    const downloadDocument = async (doc) => {
      try {
        loading.value = true
        // Show loading spinner
        $q.notify({
          type: 'ongoing',
          message: 'Downloading document...',
          timeout: 0,
        })

        await store.downloadDocument(doc.id)

        // Clear the loading notification
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

    return {
      uploadDialog,
      selectedFile,
      documentType,
      documentName,
      documentNote,
      currentUploadCategory,
      uploading,
      fileError,
      nameError,
      categoryOptions,
      triggerFileUpload,
      handleUpload,
      deleteDocument,
      formatDate,
      getDocuments,
      downloadDocument,
      loading,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
