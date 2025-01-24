<template>
  <div class="clients">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">Client Management</div>
      <q-btn color="primary" icon="person_add" label="New Client" />
    </div>

    <q-card>
      <q-table :rows="clients" :columns="columns" row-key="id" :filter="filter" :loading="loading">
        <template v-slot:top-right>
          <q-input v-model="filter" placeholder="Search Clients" dense outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
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
              <q-btn flat round size="sm" color="primary" icon="visibility">
                <q-tooltip>View Details</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="warning" icon="edit">
                <q-tooltip>Edit Client</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="negative" icon="delete">
                <q-tooltip>Delete Client</q-tooltip>
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
  name: 'ClientsPage',
  setup() {
    const loading = ref(false)
    const filter = ref('')

    const columns = [
      { name: 'id', label: 'Client ID', field: 'id', sortable: true },
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'phone', label: 'Phone', field: 'phone' },
      { name: 'status', label: 'Status', field: 'status', sortable: true },
      { name: 'cases', label: 'Active Cases', field: 'cases', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const clients = [
      {
        id: 'CL001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'Active',
        cases: 2,
      },
      {
        id: 'CL002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        status: 'Inactive',
        cases: 0,
      },
    ]

    const getStatusColor = (status) => {
      const colors = {
        Active: 'positive',
        Inactive: 'grey',
        Pending: 'warning',
      }
      return colors[status] || 'grey'
    }

    return {
      loading,
      filter,
      columns,
      clients,
      getStatusColor,
    }
  },
}
</script>
