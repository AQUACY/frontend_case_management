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
