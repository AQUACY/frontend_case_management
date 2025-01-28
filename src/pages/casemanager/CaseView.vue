<template>
  <div class="case-view q-pa-md">
    <!-- Loading State -->
    <div v-if="casesStore.isLoading" class="column items-center q-pa-lg">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey q-mt-md">Loading case information...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="casesStore.error" class="column items-center q-pa-lg">
      <q-icon name="error" color="negative" size="3em" />
      <div class="text-negative q-mt-md">{{ casesStore.error }}</div>
      <q-btn color="primary" label="Retry" @click="fetchCaseData" class="q-mt-md" />
    </div>

    <!-- Content -->
    <div v-else-if="casesStore.currentCase" class="content-container">
      <!-- Case Overview Card -->
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card class="overview-card">
            <q-card-section>
              <div class="row items-center">
                <div class="text-h6 text-white">
                  Case: {{ casesStore.currentCase.order_number }}
                </div>
                <q-space />
                <q-chip :color="getStatusColor(casesStore.currentCase.status)" text-color="white">
                  {{ casesStore.currentCase.status }}
                </q-chip>
              </div>
              <div class="text-subtitle2 text-white q-mt-sm">
                Client: {{ casesStore.currentCase.user.name }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Section Cards -->
      <div class="row q-col-gutter-md q-mt-md">
        <template v-for="section in sections" :key="section.path">
          <div class="col-12 col-sm-6 col-md-4">
            <q-card class="section-card cursor-pointer" @click="navigateToSection(section.path)">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">{{ section.title }}</div>
                    <div class="text-subtitle2 text-grey-7">{{ section.description }}</div>
                  </div>
                  <div class="col-auto">
                    <q-icon :name="section.icon" size="3em" :color="section.color" />
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  :color="section.color"
                  :label="section.actionLabel || 'View'"
                  :icon-right="section.actionIcon || 'arrow_forward'"
                />
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCasesStore } from 'stores/casemanager/casesStore'

export default {
  name: 'CaseView',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const casesStore = useCasesStore()

    const sections = [
      {
        title: 'Client Records',
        description: 'View and manage client personal information',
        icon: 'person',
        color: 'primary',
        path: `/case/${route.params.id}/client-records`,
      },
      {
        title: 'Documents',
        description: 'Access case-related documents and files',
        icon: 'folder',
        color: 'deep-orange',
        path: `/case/${route.params.id}/documents`,
      },
      {
        title: 'My Profile',
        description: 'View and update profile information',
        icon: 'account_circle',
        color: 'teal',
        path: `/case/${route.params.id}/profile`,
      },
      {
        title: 'Messages',
        description: 'Communication history and updates',
        icon: 'message',
        color: 'purple',
        path: `/case/${route.params.id}/messages`,
      },
      {
        title: 'Proposed Endeavor',
        description: 'Employment and future plans',
        icon: 'work',
        color: 'blue',
        path: `/case/${route.params.id}/proposed-endeavor`,
      },
      {
        title: 'Publication Records',
        description: 'Academic and research publications',
        icon: 'library_books',
        color: 'deep-purple',
        path: `/case/${route.params.id}/publications`,
      },
      {
        title: 'Questionnaire',
        description: 'Case-related forms and questions',
        icon: 'assignment',
        color: 'green',
        path: `/case/${route.params.id}/questionnaire`,
      },
      {
        title: 'Summary of Contributions',
        description: 'Professional achievements and impact',
        icon: 'stars',
        color: 'amber-9',
        path: `/case/${route.params.id}/contributions`,
      },
      {
        title: 'I-485 Application',
        description: 'Track I-485 application status',
        icon: 'description',
        color: 'brown',
        path: `/case/${route.params.id}/i485`,
      },
    ]

    const clientName = computed(() => {
      const client = casesStore.currentCase?.client_record
      if (!client) return 'Loading...'
      return `${client.title || ''} ${client.first_name || ''} ${client.last_name || ''}`
    })

    const fetchCaseData = async () => {
      await casesStore.fetchCaseDetails(route.params.id)
    }

    const navigateToSection = (path) => {
      router.push(path)
    }

    const getStatusColor = (status) => {
      const colors = {
        active: 'positive',
        pending: 'warning',
        completed: 'primary',
        default: 'grey',
      }
      return colors[status?.toLowerCase()] || colors.default
    }

    onMounted(() => {
      if (route.params.id) {
        fetchCaseData()
      }
    })

    return {
      casesStore,
      sections,
      clientName,
      navigateToSection,
      getStatusColor,
      fetchCaseData,
    }
  },
}
</script>

<style lang="scss" scoped>
.case-view {
  .overview-card {
    background: linear-gradient(to right, #1976d2, #2196f3);
    color: white;
  }

  .section-card {
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    height: 100%;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .q-card {
    .text-h6 {
      font-size: 1.25rem;
      line-height: 1.5;
    }
  }

  .content-container {
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>
