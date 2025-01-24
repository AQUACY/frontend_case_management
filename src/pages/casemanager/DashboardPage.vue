<template>
  <div class="dashboard">
    <!-- Stats Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Total Cases</div>
            <div class="text-h4">{{ store.totalCases }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-positive text-white">
          <q-card-section>
            <div class="text-h6">Active Cases</div>
            <div class="text-h4">{{ store.totalActiveCases }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-warning text-white">
          <q-card-section>
            <div class="text-h6">Pending Reviews</div>
            <div class="text-h4">{{ store.pendingReviews }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-negative text-white">
          <q-card-section>
            <div class="text-h6">Urgent Cases</div>
            <div class="text-h4">{{ store.urgentCases }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Recent Cases with Updates -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Recent Updates</div>
      </q-card-section>

      <q-table
        :rows="recentUpdates"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="store.loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getStatusColor(props.row.status)" text-color="white" size="sm">
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-priority="props">
          <q-td :props="props">
            <q-chip :color="getPriorityColor(props.row.priority)" text-color="white" size="sm">
              {{ props.row.priority }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props">
            {{ formatDate(props.row.updated_at) }}
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
                @click="viewCase(props.row)"
              >
                <q-tooltip>View Case</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="warning" icon="edit" @click="editCase(props.row)">
                <q-tooltip>Edit Case</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { useCaseManagerStore } from 'src/stores/casemanager/caseManager'
import { useRouter } from 'vue-router'

export default {
  name: 'DashboardPage',
  setup() {
    const store = useCaseManagerStore()
    const router = useRouter()
    const recentUpdates = ref([])

    const columns = [
      { name: 'id', label: 'Case ID', field: 'id', align: 'left' },
      { name: 'client_name', label: 'Client', field: 'client_name', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'left' },
      { name: 'priority', label: 'Priority', field: 'priority', align: 'left' },
      { name: 'updated_at', label: 'Last Updated', field: 'updated_at', align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const getStatusColor = (status) => {
      const colors = {
        active: 'positive',
        pending: 'warning',
        closed: 'grey',
        pending_review: 'orange',
        default: 'grey',
      }
      return colors[status] || colors.default
    }

    const getPriorityColor = (priority) => {
      const colors = {
        high: 'negative',
        medium: 'warning',
        low: 'positive',
        default: 'grey',
      }
      return colors[priority] || colors.default
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMMM D, YYYY HH:mm')
    }

    const viewCase = (caseItem) => {
      router.push(`/casemanager/cases/${caseItem.id}`)
    }

    const editCase = (caseItem) => {
      router.push(`/casemanager/cases/${caseItem.id}/edit`)
    }

    const loadDashboardData = async () => {
      try {
        await store.fetchAllCases()
        recentUpdates.value = await store.getRecentUpdates()
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      store,
      columns,
      recentUpdates,
      getStatusColor,
      getPriorityColor,
      formatDate,
      viewCase,
      editCase,
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  .q-card {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
