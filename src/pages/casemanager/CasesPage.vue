<template>
  <div class="cases">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">Cases Management</div>
      <q-btn color="primary" icon="add" label="New Case" />
    </div>

    <q-card>
      <q-table
        :rows="casesStore.getFilteredCases"
        :columns="columns"
        row-key="id"
        :filter="casesStore.filters.search"
        :loading="casesStore.isLoading"
        v-model:pagination="casesStore.pagination"
        @request="onRequest"
      >
        <!-- Search and Filters -->
        <template v-slot:top>
          <div class="row full-width q-col-gutter-md">
            <!-- Search -->
            <div class="col-12 col-md-4">
              <q-input
                v-model="casesStore.filters.search"
                placeholder="Search cases..."
                dense
                outlined
                clearable
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <!-- Status Filter -->
            <div class="col-12 col-md-2">
              <q-select
                v-model="casesStore.filters.status"
                :options="casesStore.getCaseStatuses"
                label="Status"
                dense
                outlined
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Type Filter -->
            <div class="col-12 col-md-2">
              <q-select
                v-model="casesStore.filters.type"
                :options="casesStore.getCaseTypes"
                label="Case Type"
                dense
                outlined
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Reset Filters -->
            <div class="col-12 col-md-2">
              <q-btn
                label="Reset Filters"
                color="secondary"
                flat
                @click="casesStore.resetFilters"
              />
            </div>
          </div>
        </template>

        <!-- Actions Column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn
                flat
                round
                size="sm"
                color="primary"
                icon="visibility"
                @click="viewCase(props.row.id)"
              />
              <!-- <q-btn
                flat
                round
                size="sm"
                color="warning"
                icon="edit"
                @click="editCase(props.row.id)"
              /> -->
              <!-- <q-btn
                flat
                round
                size="sm"
                color="negative"
                icon="delete"
                @click="deleteCase(props.row.id)"
              /> -->
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Error Dialog -->
    <q-dialog v-model="showError" persistent>
      <q-card>
        <q-card-section class="bg-negative text-white">
          <div class="text-h6">Error</div>
        </q-card-section>
        <q-card-section>
          {{ casesStore.errorMessage }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="casesStore.clearError" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useCasesStore } from 'stores/casemanager/casesStore'
import { useRouter } from 'vue-router'

export default {
  name: 'CasesPage',

  setup() {
    const casesStore = useCasesStore()
    const router = useRouter()
    const showError = computed(() => casesStore.hasError)

    const columns = [
      { name: 'id', label: 'Case ID', field: 'order_number', align: 'left', sortable: true },
      {
        name: 'client',
        label: 'Client',
        field: (row) => row.user?.name || 'N/A',
        align: 'left',
        sortable: true,
      },
      { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
      {
        name: 'date',
        label: 'Date Created',
        field: 'created_at',
        align: 'left',
        sortable: true,
        format: (val) =>
          new Date(val).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
      },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    // Load cases when component mounts
    onMounted(async () => {
      await casesStore.fetchCases()
    })

    // Handle pagination
    const onRequest = (props) => {
      casesStore.updatePagination(props.pagination)
    }

    // Action handlers
    const viewCase = (id) => {
      router.push(`/casemanager/cases/${id}`)
    }

    const editCase = (id) => {
      router.push(`/casemanager/cases/${id}/edit`)
    }

    const deleteCase = (id) => {
      // Implement delete functionality
      console.log('Delete case:', id)
    }

    return {
      casesStore,
      columns,
      showError,
      onRequest,
      viewCase,
      editCase,
      deleteCase,
    }
  },
}
</script>

<style lang="scss" scoped>
.cases {
  padding: 20px;
}
</style>
