<template>
  <div class="case-view q-pa-md">
    <!-- Loading State -->
    <div v-if="casesStore.isLoading" class="column items-center q-pa-lg">
      <q-spinner color="green" size="3em" />
      <div class="text-grey q-mt-md">Loading case information...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="casesStore.error" class="column items-center q-pa-lg">
      <q-icon name="error" color="negative" size="3em" />
      <div class="text-negative q-mt-md">{{ casesStore.error }}</div>
      <q-btn color="green" label="Retry" @click="fetchCaseData" class="q-mt-md" />
    </div>

    <!-- Content -->
    <div v-else-if="casesStore.currentCase" class="content-container">
      <!-- Case Overview Card -->
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card class="overview-card bg-green">
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
              <div class="text-subtitle2 text-white q-mt-sm">
                Bill: USD {{ casesStore.currentCase.bill }}
              </div>

              <!-- Add these buttons after your existing content -->
              <div class="row q-mt-md q-gutter-sm">
                <q-btn
                  color="secondary"
                  icon="add"
                  label="Add Case Status"
                  @click="openAddStatusDialog"
                />
                <q-btn
                  color="green-10"
                  icon="visibility"
                  label="View Case Status"
                  @click="openViewStatusDialog"
                />
                <q-btn
                  color="primary"
                  icon="folder"
                  label="Sample Documents"
                  @click="sampleDocsDialog = true"
                />
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

      <!-- <PaymentHistoryTable /> -->

      <!-- Add Status Dialog -->
      <q-dialog v-model="addStatusDialog.show" persistent>
        <q-card style="min-width: 400px">
          <q-card-section class="row items-center">
            <div class="text-h6">Add Case Status</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit="submitCaseStatus">
              <q-input
                v-model="addStatusDialog.form.service_type"
                label="Service Type *"
                :rules="[(val) => !!val || 'Service type is required']"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="addStatusDialog.form.receipt_number"
                label="Receipt Number *"
                :rules="[(val) => !!val || 'Receipt number is required']"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="addStatusDialog.form.date_of_filing"
                label="Date of Filing"
                type="date"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="addStatusDialog.form.date_of_decision"
                label="Date of Decision"
                type="date"
                class="q-mb-md"
                color="green"
              />

              <div class="row justify-end q-mt-md">
                <q-btn label="Cancel" color="negative" flat v-close-popup />
                <q-btn
                  label="Submit"
                  color="green"
                  type="submit"
                  :loading="addStatusDialog.loading"
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- View Status Dialog -->
      <q-dialog v-model="viewStatusDialog.show" persistent>
        <q-card style="min-width: 700px">
          <q-card-section class="row items-center">
            <div class="text-h6">Case Status History</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="caseStatuses"
              :columns="statusColumns"
              row-key="id"
              :loading="viewStatusDialog.loading"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn flat round color="primary" icon="edit" @click="openEditStatus(props.row)">
                    <q-tooltip>Edit Status</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="negative"
                    icon="delete"
                    @click="confirmDeleteStatus(props.row)"
                  >
                    <q-tooltip>Delete Status</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Edit Status Dialog -->
      <q-dialog v-model="editStatusDialog.show" persistent>
        <q-card style="min-width: 400px">
          <q-card-section class="row items-center">
            <div class="text-h6">Edit Case Status</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit="updateCaseStatus">
              <q-input
                v-model="editStatusDialog.form.service_type"
                label="Service Type *"
                :rules="[(val) => !!val || 'Service type is required']"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="editStatusDialog.form.receipt_number"
                label="Receipt Number *"
                :rules="[(val) => !!val || 'Receipt number is required']"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="editStatusDialog.form.date_of_filing"
                label="Date of Filing"
                type="date"
                class="q-mb-md"
                color="green"
              />
              <q-input
                v-model="editStatusDialog.form.date_of_decision"
                label="Date of Decision"
                type="date"
                class="q-mb-md"
                color="green"
              />

              <div class="row justify-end q-mt-md">
                <q-btn label="Cancel" color="negative" flat v-close-popup />
                <q-btn
                  label="Update"
                  color="green"
                  type="submit"
                  :loading="editStatusDialog.loading"
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Delete Confirmation Dialog -->
      <q-dialog v-model="deleteStatusDialog.show">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="negative" text-color="white" />
            <span class="q-ml-sm">Are you sure you want to delete this status?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="green" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="negative"
              @click="deleteCaseStatus"
              :loading="deleteStatusDialog.loading"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <SampleDocumentsDialog v-model="sampleDocsDialog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCasesStore } from 'stores/casemanager/casesStore'

import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import SampleDocumentsDialog from './components/SampleDocumentsDialog.vue'

export default {
  name: 'CaseView',
  components: {
    SampleDocumentsDialog,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const casesStore = useCasesStore()
    const $q = useQuasar()
    const caseStatuses = ref([])
    const statusColumns = [
      { name: 'service_type', label: 'Service Type', field: 'service_type', sortable: true },
      { name: 'receipt_number', label: 'Receipt Number', field: 'receipt_number', sortable: true },
      { name: 'date_of_filing', label: 'Filing Date', field: 'date_of_filing', sortable: true },
      {
        name: 'date_of_decision',
        label: 'Decision Date',
        field: 'date_of_decision',
        sortable: true,
      },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
    ]

    const addStatusDialog = ref({
      show: false,
      loading: false,
      form: {
        service_type: '',
        receipt_number: '',
        date_of_filing: '',
        date_of_decision: '',
      },
    })

    const editStatusDialog = ref({
      show: false,
      loading: false,
      form: {
        service_type: '',
        receipt_number: '',
        date_of_filing: '',
        date_of_decision: '',
      },
    })

    const deleteStatusDialog = ref({
      show: false,
      loading: false,
      status: null,
    })
    const viewStatusDialog = ref({
      show: false,
      loading: false,
    })

    const sampleDocsDialog = ref(false)

    const sections = [
      {
        title: 'Form I-140 Questionnaire',
        description: 'Case-related forms and questions',
        icon: 'assignment',
        color: 'green',
        path: `/case/${route.params.id}/questionnaire`,
      },
      {
        title: 'Education & Professional Experience',
        description: 'Professional achievements and impact',
        icon: 'stars',
        color: 'green',
        path: `/case/${route.params.id}/Experience&Education`,
      },
      {
        title: 'Research Summary',
        description: 'View and manage client research summary information',
        icon: 'person',
        color: 'green',
        path: `/case/${route.params.id}/research-summary`,
      },
      {
        title: 'Proposed Endeavor',
        description: 'Employment and future plans',
        icon: 'work',
        color: 'green',
        path: `/case/${route.params.id}/proposed-endeavor`,
      },
      {
        title: 'Publication & Editorial Records',
        description: 'Academic and research publications',
        icon: 'library_books',
        color: 'green',
        path: `/case/${route.params.id}/publications`,
      },
      {
        title: 'Evidence of Extraordinary Abilities',
        description: 'Track evidence of extraordinary abilities',
        icon: 'description',
        color: 'green',
        path: `/case/${route.params.id}/extraordinary-abilities`,
      },

      {
        title: 'Recommendation Letters',
        description: 'Track recommendation letters',
        icon: 'recommend',
        color: 'green', 
        path: `/case/${route.params.id}/recommendation-letters`,
      },
      {
        title: 'Personal Statement',
        description: 'Track personal statement',
        icon: 'person',
        color: 'green',
        path: `/case/${route.params.id}/personal-statement`,
      },
      {
        title: 'Documents',
        description: 'Access case-related documents and files',
        icon: 'folder',
        color: 'green',
        path: `/case/${route.params.id}/documents`,
      },

      {
        title: 'Messages',
        description: 'Communication history and updates',
        icon: 'message',
        color: 'green',
        path: `/case/${route.params.id}/messages`,
      },
      {
        title: 'Billing',
        description: 'View billing information',
        icon: 'wallet',
        color: 'green',
        path: `/case/${route.params.id}/billing`,
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

    const fetchCaseStatuses = async () => {
      viewStatusDialog.value.loading = true
      try {
        const response = await api.get(`/api/auth/case/${route.params.id}/statuses`)
        caseStatuses.value = response.data.data
      } catch (error) {
        console.error('Error fetching case statuses:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load case statuses',
        })
      } finally {
        viewStatusDialog.value.loading = false
      }
    }

    const openAddStatusDialog = () => {
      addStatusDialog.value.form = {
        service_type: '',
        receipt_number: '',
        date_of_filing: '',
        date_of_decision: '',
      }
      addStatusDialog.value.show = true
    }

    const openViewStatusDialog = async () => {
      viewStatusDialog.value.show = true
      await fetchCaseStatuses()
    }

    const openEditStatus = (status) => {
      editStatusDialog.value.form = { ...status }
      editStatusDialog.value.show = true
    }

    const confirmDeleteStatus = (status) => {
      deleteStatusDialog.value.status = status
      deleteStatusDialog.value.show = true
    }

    const submitCaseStatus = async () => {
      addStatusDialog.value.loading = true
      try {
        const payload = {
          ...addStatusDialog.value.form,
          case_id: route.params.id,
        }
        await api.post('/api/auth/case/statuses', payload)
        $q.notify({
          type: 'positive',
          message: 'Case status added successfully',
        })
        addStatusDialog.value.show = false
        await fetchCaseStatuses()
      } catch (error) {
        console.error('Error adding case status:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to add case status',
        })
      } finally {
        addStatusDialog.value.loading = false
      }
    }

    const updateCaseStatus = async () => {
      editStatusDialog.value.loading = true
      try {
        await api.put(
          `/api/auth/case/statuses/${editStatusDialog.value.form.id}`,
          editStatusDialog.value.form,
        )
        $q.notify({
          type: 'positive',
          message: 'Case status updated successfully',
        })
        editStatusDialog.value.show = false
        await fetchCaseStatuses()
      } catch (error) {
        console.error('Error updating case status:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to update case status',
        })
      } finally {
        editStatusDialog.value.loading = false
      }
    }

    const deleteCaseStatus = async () => {
      deleteStatusDialog.value.loading = true
      try {
        await api.delete(`/api/auth/case/statuses/${deleteStatusDialog.value.status.id}`)
        $q.notify({
          type: 'positive',
          message: 'Case status deleted successfully',
        })
        deleteStatusDialog.value.show = false
        await fetchCaseStatuses()
      } catch (error) {
        console.error('Error deleting case status:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to delete case status',
        })
      } finally {
        deleteStatusDialog.value.loading = false
      }
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
      caseStatuses,
      statusColumns,
      addStatusDialog,
      viewStatusDialog,
      editStatusDialog,
      deleteStatusDialog,
      openAddStatusDialog,
      openViewStatusDialog,
      openEditStatus,
      confirmDeleteStatus,
      submitCaseStatus,
      updateCaseStatus,
      deleteCaseStatus,
      sampleDocsDialog,
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
