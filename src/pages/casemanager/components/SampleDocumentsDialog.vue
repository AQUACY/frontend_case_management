<template>
  <q-dialog v-model="show" maximized persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Sample Documents</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!-- Search Bar -->
      <q-card-section class="q-pt-sm">
        <q-input
          v-model="searchQuery"
          outlined
          dense
          placeholder="Search documents..."
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append v-if="searchQuery">
            <q-icon name="close" class="cursor-pointer" @click="searchQuery = ''" />
          </template>
        </q-input>

        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb q-mb-md">
          <q-breadcrumbs separator="/">
            <q-breadcrumbs-el
              label="Sample Documents"
              @click="currentPath = ''"
              class="cursor-pointer"
            />
            <q-breadcrumbs-el v-if="currentPath" :label="currentPath" class="cursor-pointer" />
          </q-breadcrumbs>
        </div>

        <!-- Files and Folders List -->
        <div class="row">
          <!-- File Browser -->
          <div :class="previewFile ? 'col-6' : 'col-12'">
            <q-list bordered separator>
              <!-- Back button when inside a folder -->
              <q-item v-if="currentPath" clickable @click="currentPath = ''" class="bg-grey-2">
                <q-item-section avatar>
                  <q-icon name="arrow_back" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Back to main folder</q-item-label>
                </q-item-section>
              </q-item>

              <!-- Folders -->
              <q-item
                v-for="folder in folders"
                :key="folder.name"
                clickable
                @click="openFolder(folder.name)"
              >
                <q-item-section avatar>
                  <q-icon name="folder" color="amber" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ formatName(folder.name) }}</q-item-label>
                  <q-item-label caption>{{ folder.modified }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="chevron_right" color="grey" />
                </q-item-section>
              </q-item>

              <!-- Files -->
              <q-item v-for="file in files" :key="file.name" class="file-item">
                <q-item-section avatar>
                  <q-icon :name="getFileIcon(file.name)" :color="getFileIconColor(file.name)" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ formatName(file.name) }}</q-item-label>
                  <q-item-label caption> {{ file.modified }} - {{ file.size }} </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row items-center">
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="visibility"
                      @click="handleFilePreview(file)"
                      :loading="loading"
                    >
                      <q-tooltip>Preview</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="download"
                      @click="downloadFile(file)"
                      :loading="loading"
                    >
                      <q-tooltip>Download</q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>

              <!-- Empty State -->
              <q-item v-if="!folders.length && !files.length">
                <q-item-section class="text-center text-grey q-pa-lg">
                  <q-icon name="folder_open" size="3em" />
                  <div class="text-h6 q-mt-md">No items in this folder</div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- File Preview -->
          <div v-if="previewFile" class="col-6">
            <q-card flat bordered class="preview-panel">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-subtitle1">{{ formatName(previewFile.name) }}</div>
                <q-space />
                <q-btn flat round dense icon="close" @click="closePreview" />
              </q-card-section>

              <q-card-section>
                <!-- PDF Preview -->
                <template v-if="isFileType(previewFile.name, 'pdf')">
                  <iframe
                    :src="`/public/storage/sampledocuments/${currentPath}/${previewFile.name}#toolbar=0`"
                    class="preview-frame"
                  ></iframe>
                </template>

                <!-- Word Doc Preview -->
                <template v-else-if="isFileType(previewFile.name, ['doc', 'docx'])">
                  <div class="preview-placeholder">
                    <q-icon name="description" size="48px" color="primary" />
                    <div class="text-subtitle1 q-mt-sm">Word document preview not available</div>
                    <q-btn
                      color="primary"
                      icon="open_in_new"
                      label="Open in new tab"
                      class="q-mt-md"
                      @click="viewFile(previewFile)"
                    />
                  </div>
                </template>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Word Document Preview Modal -->
  <q-dialog v-model="showWordPreview" persistent>
    <q-card style="width: 70vw; max-height: 80vh">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ selectedFile?.name }}</div>
        <q-space />
        <q-btn
          color="primary"
          icon="download"
          label="Download"
          flat
          @click="downloadFile(selectedFile)"
          :loading="loading"
          class="q-mr-md"
        />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-none">
        <div class="preview-container">
          <iframe
            v-if="selectedFile"
            :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              window.location.origin + getDownloadUrl(currentPath, selectedFile.name),
            )}`"
            width="100%"
            height="600px"
            frameborder="0"
          />
          <div v-if="loading" class="preview-loading">
            <q-spinner color="primary" size="3em" />
            <div class="text-subtitle1 q-mt-md">Loading preview...</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- PDF Preview Dialog -->
  <q-dialog v-model="showPdfPreview" persistent>
    <q-card style="width: 70vw; max-height: 80vh">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ selectedFile?.name }}</div>
        <q-space />
        <q-btn
          color="primary"
          icon="download"
          label="Download"
          flat
          @click="downloadFile(selectedFile)"
          :loading="loading"
          class="q-mr-md"
        />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-none">
        <div class="preview-container">
          <iframe
            v-if="selectedFile"
            :src="getDownloadUrl(currentPath, selectedFile.name)"
            width="100%"
            height="600px"
            frameborder="0"
            type="application/pdf"
          />
          <div v-if="loading" class="preview-loading">
            <q-spinner color="primary" size="3em" />
            <div class="text-subtitle1 q-mt-md">Loading preview...</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'SampleDocumentsDialog',

  props: {
    modelValue: Boolean,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const $q = useQuasar()
    const currentPath = ref('')
    const searchQuery = ref('')
    const showWordPreview = ref(false)
    const showPdfPreview = ref(false)
    const selectedFile = ref(null)
    const loading = ref(false)
    const folderContents = ref([])

    // Initial folder structure
    const mainFolders = [
      { name: 'Email templates for clients', type: 'folder', modified: '2/16/2025 3:03 PM' },
      { name: 'Sample of publication records', type: 'folder', modified: '2/16/2025 3:02 PM' },
      { name: 'Samples of Approved petitions', type: 'folder', modified: '2/16/2025 3:02 PM' },
      { name: 'Samples of degree evaluation', type: 'folder', modified: '2/16/2025 3:02 PM' },
      {
        name: 'Samples of Letter of Recommendation',
        type: 'folder',
        modified: '2/16/2025 3:02 PM',
      },
      { name: 'Samples of Personal Statement', type: 'folder', modified: '2/16/2025 3:02 PM' },
    ]

    // Email templates structure
    const emailTemplates = [
      {
        name: 'Email Reminder for Recommender.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
        size: '243 KB',
      },
      {
        name: 'Email Requesting a First Author Contribution Letter.docx',
        type: 'file',
        modified: '2/13/2025 1:59 PM',
        size: '243 KB',
      },
      {
        name: 'Email Requesting a Peer Review Testimonial Letter.docx',
        type: 'file',
        modified: '2/13/2025 2:01 PM',
        size: '243 KB',
      },
      {
        name: 'Email Requesting to Be an Associate Editor.docx',
        type: 'file',
        modified: '2/13/2025 2:04 PM',
        size: '243 KB',
      },
      {
        name: 'Email Requesting to Conduct Peer Reviews.docx',
        type: 'file',
        modified: '2/13/2025 2:02 PM',
        size: '243 KB',
      },
      {
        name: 'Email to a Potential Recommender.docx',
        type: 'file',
        modified: '2/13/2025 1:55 PM',
        size: '244 KB',
      },
      {
        name: 'Email to Send with Draft Letter.docx',
        type: 'file',
        modified: '2/13/2025 1:57 PM',
        size: '243 KB',
      },
    ]

    // sample publication records
    const publicationRecords = [
      {
        name: 'Conference Abstract Example.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
        size: '243 KB',
      },
      {
        name: 'Notable citation evidence.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
        size: '243 KB',
      },
      {
        name: 'Publication list_Paul Tetteh Asare.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
        size: '243 KB',
      },
    ]

    // sample approved petitions
    const approvedPetitions = [
      {
        name: 'Full petition package_NIW_Asare.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Full petition package_NIW_Bila.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Full petition package_NIW_Daliri.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Full petition package_NIW_Nkwantabisah.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Full petition package_NIW_Sam.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },

      {
        name: 'Full petition package_NIW_Quansah.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Full petition package_NIW_Yeboah.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
    ]

    // sample degree evaluation
    const degreeEvaluation = [
      {
        name: 'PhD degree evaluation_Paul Tetteh Asare.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
    ]

    // sample letter of recommendation
    const letterOfRecommendation = [
      {
        name: 'Sample of Recommendation Letter A-1.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter A-2.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter A-3.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-1.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-2.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-3.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-4.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-5.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-6.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter B-7.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter C-1.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter C-2.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
      {
        name: 'Sample of Recommendation Letter Z.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
    ]

    // sample personal statement
    const personalStatement = [
      {
        name: 'Personal Statement.pdf',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
        {
        name: 'Personal statement_Paul Tetteh Asare.docx',
        type: 'file',
        modified: '2/13/2025 1:58 PM',
      },
    ]

    // Handle folder contents based on current path
    const getFolderContents = () => {
      if (!currentPath.value) {
        return mainFolders
      } else if (currentPath.value === 'Email templates for clients') {
        return emailTemplates
      } else if (currentPath.value === 'Sample of publication records') {
        return publicationRecords
      } else if (currentPath.value === 'Samples of Approved petitions') {
        return approvedPetitions
      } else if (currentPath.value === 'Samples of degree evaluation') {
        return degreeEvaluation
      } else if (currentPath.value === 'Samples of Letter of Recommendation') {
        return letterOfRecommendation
      } else if (currentPath.value === 'Samples of Personal Statement') {
        return personalStatement
      }
      return folderContents.value
    }

    const filteredItems = computed(() => {
      const items = getFolderContents()
      if (!searchQuery.value) return items

      const query = searchQuery.value.toLowerCase()
      return items.filter((item) => item.name.toLowerCase().includes(query))
    })

    const folders = computed(() => filteredItems.value.filter((item) => item.type === 'folder'))

    const files = computed(() => filteredItems.value.filter((item) => item.type === 'file'))

    const openFolder = async (folderName) => {
      currentPath.value = folderName
      selectedFile.value = null
      searchQuery.value = ''
      showWordPreview.value = false
      showPdfPreview.value = false

      if (folderName && !emailTemplates.length) {
        loading.value = true
        try {
          const response = await api.get(`/api/sample-documents/${folderName}`)
          folderContents.value = response.data
        } catch (error) {
          console.error('Error fetching folder contents:', error)
          $q.notify({
            type: 'negative',
            message: 'Failed to load folder contents',
          })
        } finally {
          loading.value = false
        }
      }
    }

    const viewFile = (file) => {
      const fileUrl = `public/storage/sampledocuments/${currentPath.value}/${file.name}`
      window.open(fileUrl, '_blank')
    }

    const getDownloadUrl = (folder, filename) => {
      // Ensure we're using the correct folder name without any path issues
      const cleanFolder = folder.replace(/^\/+|\/+$/g, '')
      const cleanFilename = filename.replace(/^\/+|\/+$/g, '')
      return `/api/download-sample-document/${encodeURIComponent(cleanFolder)}/${encodeURIComponent(cleanFilename)}`
    }

    const handleFilePreview = (file) => {
      selectedFile.value = file
      const fileExtension = file.name.split('.').pop().toLowerCase()

      if (['doc', 'docx'].includes(fileExtension)) {
        showWordPreview.value = true
      } else if (fileExtension === 'pdf') {
        showPdfPreview.value = true
      } else {
        downloadFile(file)
      }
    }

    const closePreview = () => {
      selectedFile.value = null
    }

    const isFileType = (filename, types) => {
      const extensions = Array.isArray(types) ? types : [types]
      return extensions.some((ext) => filename.toLowerCase().endsWith(`.${ext.toLowerCase()}`))
    }

    const formatName = (name) => {
      return name.replace(/\.[^/.]+$/, '')
    }

    const getFileIcon = (filename) => {
      if (filename.endsWith('.pdf')) return 'picture_as_pdf'
      if (filename.match(/\.(doc|docx)$/i)) return 'description'
      return 'insert_drive_file'
    }

    const getFileIconColor = (filename) => {
      if (filename.endsWith('.pdf')) return 'red'
      if (filename.match(/\.(doc|docx)$/i)) return 'blue'
      return 'grey'
    }

    const formatFileSize = (size) => {
      return size
    }

    const downloadFile = async (file) => {
      if (!file) return

      try {
        loading.value = true
        const downloadUrl = getDownloadUrl(currentPath.value, file.name)

        // Log the download URL for debugging
        console.log('Downloading from:', downloadUrl)

        const response = await api.get(downloadUrl, {
          responseType: 'blob',
          headers: {
            Accept: '*/*', // Accept any content type
            'Content-Type': 'application/json',
          },
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        $q.notify({
          type: 'positive',
          message: 'File downloaded successfully',
        })
      } catch (error) {
        console.error('Download error:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to download file',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      // Initialize with main folders
      folderContents.value = mainFolders
    })

    return {
      show: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      currentPath,
      searchQuery,
      showWordPreview,
      showPdfPreview,
      selectedFile,
      loading,
      folders,
      files,
      openFolder,
      viewFile,
      handleFilePreview,
      closePreview,
      isFileType,
      formatName,
      getFileIcon,
      getFileIconColor,
      formatFileSize,
      downloadFile,
      getDownloadUrl,
    }
  },
}
</script>

<style lang="scss" scoped>
.folder-browser {
  .q-item {
    min-height: 60px;

    &:hover {
      background: $grey-2;
    }
  }

  .q-breadcrumbs {
    .q-breadcrumbs-el {
      &:hover {
        color: $primary;
      }
    }
  }
}

.preview-panel {
  height: calc(100vh - 250px);
  overflow: hidden;

  .preview-frame {
    width: 100%;
    height: calc(100% - 50px);
    border: none;
  }

  .preview-placeholder {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $grey-2;
    border-radius: 4px;
  }
}

.q-input {
  max-width: 300px;
}

.word-preview-container {
  width: 100%;
  height: calc(100vh - 150px);
  background: white;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.file-item {
  transition: background-color 0.2s;

  &:hover {
    background-color: $grey-2;
  }

  .q-btn {
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

.preview-container {
  position: relative;
  background: #f5f5f5;

  .preview-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  iframe {
    position: relative;
    z-index: 1;
    background: white;
  }
}

.q-dialog__inner--minimized {
  padding: 50px;
}
</style>
