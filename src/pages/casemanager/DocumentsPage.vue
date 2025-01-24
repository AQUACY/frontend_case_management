<template>
  <div class="documents">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">Document Management</div>
      <q-btn color="primary" icon="upload_file" label="Upload Document" />
    </div>

    <!-- Document Categories -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="description" size="3em" color="primary" />
            <div class="text-h6 q-mt-sm">Case Files</div>
            <div class="text-caption">125 documents</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="folder_shared" size="3em" color="warning" />
            <div class="text-h6 q-mt-sm">Client Documents</div>
            <div class="text-caption">89 documents</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="gavel" size="3em" color="positive" />
            <div class="text-h6 q-mt-sm">Legal Forms</div>
            <div class="text-caption">45 documents</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="receipt_long" size="3em" color="negative" />
            <div class="text-h6 q-mt-sm">Reports</div>
            <div class="text-caption">67 documents</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Documents Table -->
    <q-card>
      <q-table
        :rows="documents"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top-right>
          <q-input v-model="filter" placeholder="Search Documents" dense outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn flat round size="sm" color="primary" icon="visibility">
                <q-tooltip>View</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="secondary" icon="download">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="negative" icon="delete">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DocumentsPage',
  setup() {
    const loading = ref(false)
    const filter = ref('')

    const columns = [
      { name: 'name', label: 'Document Name', field: 'name', sortable: true },
      { name: 'type', label: 'Type', field: 'type', sortable: true },
      { name: 'case', label: 'Case ID', field: 'case' },
      { name: 'uploaded', label: 'Upload Date', field: 'uploaded', sortable: true },
      { name: 'size', label: 'Size', field: 'size', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const documents = [
      {
        id: 1,
        name: 'Case Summary Report.pdf',
        type: 'PDF',
        case: 'C001',
        uploaded: '2024-01-20',
        size: '2.5 MB',
      },
      {
        id: 2,
        name: 'Client Agreement.docx',
        type: 'Word',
        case: 'C002',
        uploaded: '2024-01-19',
        size: '1.8 MB',
      },
    ]

    return {
      loading,
      filter,
      columns,
      documents,
    }
  },
}
</script>
