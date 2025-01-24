<template>
  <div class="cases">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">Cases Management</div>
      <q-btn color="primary" icon="add" label="New Case" />
    </div>

    <q-card>
      <q-table :rows="cases" :columns="columns" row-key="id" :filter="filter" :loading="loading">
        <template v-slot:top-right>
          <q-input v-model="filter" placeholder="Search" dense outlined class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn flat round size="sm" color="primary" icon="visibility" />
              <q-btn flat round size="sm" color="warning" icon="edit" />
              <q-btn flat round size="sm" color="negative" icon="delete" />
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
  name: 'CasesPage',
  setup() {
    const loading = ref(false)
    const filter = ref('')

    const columns = [
      { name: 'id', label: 'Case ID', field: 'id', align: 'left', sortable: true },
      { name: 'client', label: 'Client', field: 'client', align: 'left', sortable: true },
      { name: 'type', label: 'Case Type', field: 'type', align: 'left', sortable: true },
      { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
      { name: 'date', label: 'Date Created', field: 'date', align: 'left', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const cases = [
      { id: 'C001', client: 'John Doe', type: 'Immigration', status: 'Active', date: '2024-01-20' },
      { id: 'C002', client: 'Jane Smith', type: 'Visa', status: 'Pending', date: '2024-01-19' },
    ]

    return {
      loading,
      filter,
      columns,
      cases,
    }
  },
}
</script>
