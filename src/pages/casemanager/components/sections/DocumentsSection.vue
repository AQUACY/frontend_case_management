<template>
  <div class="documents-section">
    <div class="text-h6 q-mb-md">Documents</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-table
              :rows="documents"
              :columns="columns"
              row-key="id"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:top>
                <div class="q-table__title">Case Documents</div>
                <q-space />
                <q-select
                  v-model="filter"
                  :options="filterOptions"
                  label="Filter by category"
                  dense
                  outlined
                  class="q-ml-md"
                  style="width: 200px"
                />
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip :color="getStatusColor(props.row.status)" text-color="white" size="sm">
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn-group flat>
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="primary"
                      icon="visibility"
                      @click="previewDocument(props.row)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="secondary"
                      icon="download"
                      @click="downloadDocument(props.row)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="negative"
                      icon="delete"
                      @click="deleteDocument(props.row)"
                    />
                  </q-btn-group>
                </q-td>
              </template>
            </q-table>

            <!-- Document Preview Dialog -->
            <q-dialog v-model="previewDialog" full-width>
              <q-card>
                <q-card-section class="row items-center">
                  <div class="text-h6">{{ selectedDocument?.name }}</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                  <div class="document-preview">
                    <!-- Add document preview component based on file type -->
                    <iframe
                      v-if="selectedDocument?.url"
                      :src="selectedDocument.url"
                      style="width: 100%; height: 600px"
                      frameborder="0"
                    ></iframe>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DocumentsSection',
  props: {
    documents: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      filter: null,
      filterOptions: [
        'Personal Documents',
        'Academic Records',
        'Professional Documents',
        'Immigration Forms',
        'All',
      ],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Document Name',
          align: 'left',
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: 'category',
          align: 'left',
          label: 'Category',
          field: (row) => row.category,
          sortable: true,
        },
        {
          name: 'uploadDate',
          align: 'left',
          label: 'Upload Date',
          field: (row) => row.upload_date,
          sortable: true,
          format: (val) => this.formatDate(val),
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: (row) => row.status,
          sortable: true,
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions',
        },
      ],
      previewDialog: false,
      selectedDocument: null,
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    getStatusColor(status) {
      const colors = {
        pending: 'orange',
        approved: 'positive',
        rejected: 'negative',
        review: 'info',
      }
      return colors[status.toLowerCase()] || 'grey'
    },
    previewDocument(document) {
      this.selectedDocument = document
      this.previewDialog = true
    },
    downloadDocument(document) {
      // Implement document download
      console.log('Download document:', document)
    },
    deleteDocument(document) {
      // Implement document deletion with confirmation
      this.$q
        .dialog({
          title: 'Confirm Deletion',
          message: `Are you sure you want to delete ${document.name}?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log('Delete document:', document)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.documents-section {
  .document-preview {
    background: #f5f5f5;
    border-radius: 4px;
    min-height: 200px;
  }
}
</style>
