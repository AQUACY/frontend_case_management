<template>
  <div class="dashboard">
    <!-- Loading State -->
    <div v-if="store.isLoading" class="row justify-center q-pa-md">
      <q-spinner color="primary" size="3em" />
    </div>

    <!-- Error State -->
    <q-banner v-if="store.hasError" class="bg-negative text-white q-mb-md">
      An error occurred while loading the dashboard data. Please try again.
      <template v-slot:action>
        <q-btn flat color="white" label="Retry" @click="loadDashboardData" />
      </template>
    </q-banner>

    <!-- Content -->
    <template v-if="!store.isLoading && !store.hasError">
      <!-- Navigation Stats Cards -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6 col-md-6">
          <q-card
            class="bg-primary text-white cursor-pointer"
            @click="router.push('/casemanager/cases?status=all')"
          >
            <q-card-section>
              <div class="text-h6">Total Cases</div>
              <div class="text-h4">{{ store.totalCases }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-card
            class="bg-positive text-white cursor-pointer"
            @click="router.push('/casemanager/cases?status=active')"
          >
            <q-card-section>
              <div class="text-h6">Active Cases</div>
              <div class="text-h4">{{ store.totalActiveCases }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Pending Reviews Overview -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Pending Items Overview</div>
        </q-card-section>

        <q-list padding>
          <q-item
            v-ripple
            clickable
            @click="router.push('/casemanager/cases?filter=pending_questionnaires')"
          >
            <q-item-section avatar>
              <q-icon name="assignment" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Questionnaires Pending Review</q-item-label>
              <q-item-label caption
                >{{ store.pendingQuestionnaires || 0 }} items need your attention</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-chip color="warning" text-color="white" size="sm">
                {{ store.pendingQuestionnaires || 0 }}
              </q-chip>
            </q-item-section>
          </q-item>
          <!--
          <q-item
            v-ripple
            clickable
            @click="router.push('/casemanager/cases?filter=pending_messages')"
          >
            <q-item-section avatar>
              <q-icon name="message" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Messages Pending Response</q-item-label>
              <q-item-label caption
                >{{ store.pendingMessages || 0 }} messages need your reply</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-chip color="warning" text-color="white" size="sm">
                {{ store.pendingMessages || 0 }}
              </q-chip>
            </q-item-section>
          </q-item> -->

          <q-item
            v-ripple
            clickable
            @click="router.push('/casemanager/cases?filter=pending_edavors')"
          >
            <q-item-section avatar>
              <q-icon name="description" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Proposed Edavors Pending Review</q-item-label>
              <q-item-label caption
                >{{ store.pendingEdavors || 0 }} edavors need review</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-chip color="warning" text-color="white" size="sm">
                {{ store.pendingEdavors || 0 }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </template>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useCaseManagerStore } from 'src/stores/casemanager/caseManager'
import { useRouter } from 'vue-router'

export default {
  name: 'DashboardPage',
  setup() {
    const store = useCaseManagerStore()
    const router = useRouter()

    const loadDashboardData = async () => {
      try {
        await Promise.all([store.fetchAllCases(), store.fetchPendingItems()])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      store,
      router,
      loadDashboardData,
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
