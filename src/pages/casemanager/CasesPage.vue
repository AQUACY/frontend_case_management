<template>
  <div class="cases">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">Cases Management</div>
      <q-btn
        v-if="user_role === 2"
        color="primary"
        icon="add"
        label="New Case"
        @click="openNewCaseDialog"
      />
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
              >
                <q-tooltip>View Case</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.contract_file"
                flat
                round
                size="sm"
                color="info"
                icon="description"
                @click="openContractViewer(props.row)"
              >
                <q-tooltip>View Contract</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                color="warning"
                icon="edit"
                @click="openEditCaseDialog(props.row)"
                v-if="user_role === 2"
              >
                <q-tooltip>Edit Case</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                :color="props.row.contract_file ? 'positive' : 'negative'"
                :icon="props.row.contract_file ? 'file_upload' : 'upload_file'"
                @click="openContractUploadDialog(props.row)"
                v-if="user_role === 2"
              >
                <q-tooltip>
                  {{ props.row.contract_file ? 'Update Contract' : 'Upload Contract' }}
                </q-tooltip>
              </q-btn>
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

    <!-- New Case Dialog -->
    <q-dialog v-model="newCaseDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">New Case</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-stepper v-model="step" vertical color="primary" animated>
            <!-- Case Details Step -->
            <q-step :name="1" title="Case Details" icon="assignment" :done="step > 1">
              <q-form @submit="submitNewCase" class="q-gutter-md">
                <q-input
                  v-model="newCaseForm.bill"
                  label="Bill Amount"
                  type="number"
                  prefix="$"
                  :rules="[(val) => !!val || 'Bill amount is required']"
                  outlined
                  dense
                />

                <q-select
                  v-model="newCaseForm.case_manager_id"
                  :options="caseManagers"
                  option-label="email"
                  option-value="id"
                  label="Case Manager"
                  :rules="[(val) => !!val || 'Case manager is required']"
                  outlined
                  dense
                  emit-value
                  map-options
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.name }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-select
                  v-model="newCaseForm.user_id"
                  :options="clients"
                  option-label="email"
                  option-value="id"
                  label="Client"
                  :rules="[(val) => !!val || 'Client is required']"
                  outlined
                  dense
                  emit-value
                  map-options
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.name }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  v-model="newCaseForm.description"
                  label="Description"
                  type="textarea"
                  :rules="[(val) => !!val || 'Description is required']"
                  outlined
                />

                <div class="row justify-end q-mt-md">
                  <q-btn label="Next" type="submit" color="primary" :loading="submitting" />
                </div>
              </q-form>
            </q-step>

            <!-- Contract Upload Step -->
            <q-step :name="2" title="Contract Upload" icon="upload_file" :done="step > 2">
              <q-form @submit="uploadContract" class="q-gutter-md">
                <q-file
                  v-model="contractFile"
                  label="Contract File"
                  accept=".pdf"
                  :rules="[(val) => !!val || 'Please select a PDF file']"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <div class="row justify-end q-mt-md">
                  <q-btn label="Back" flat color="primary" class="q-mr-sm" @click="step = 1" />
                  <q-btn label="Upload" type="submit" color="primary" :loading="uploading" />
                </div>
              </q-form>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Contract Upload Dialog -->
    <q-dialog v-model="contractUploadDialog">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ selectedCase?.contract_file ? 'Update Contract' : 'Upload Contract' }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="uploadContractFile" class="q-gutter-md">
            <q-file
              v-model="contractFile"
              label="Contract File"
              accept=".pdf"
              :rules="[(val) => !!val || 'Please select a PDF file']"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" flat color="negative" v-close-popup class="q-mr-sm" />
              <q-btn
                :label="selectedCase?.contract_file ? 'Update' : 'Upload'"
                type="submit"
                color="primary"
                :loading="uploading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Edit Case Dialog -->
    <q-dialog v-model="editCaseDialog">
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Edit Case</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="updateCase" class="q-gutter-md">
            <q-input
              v-model="editCaseForm.bill"
              label="Bill Amount"
              type="number"
              prefix="$"
              :rules="[(val) => !!val || 'Bill amount is required']"
              outlined
              dense
            />

            <q-select
              v-model="editCaseForm.case_manager_id"
              :options="caseManagers"
              option-label="email"
              option-value="id"
              label="Case Manager"
              :rules="[(val) => !!val || 'Case manager is required']"
              outlined
              dense
              emit-value
              map-options
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              v-model="editCaseForm.user_id"
              :options="clients"
              option-label="email"
              option-value="id"
              label="Client"
              :rules="[(val) => !!val || 'Client is required']"
              outlined
              dense
              emit-value
              map-options
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              v-model="editCaseForm.description"
              label="Description"
              type="textarea"
              :rules="[(val) => !!val || 'Description is required']"
              outlined
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" flat color="negative" v-close-popup class="q-mr-sm" />
              <q-btn label="Update" type="submit" color="primary" :loading="submitting" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Contract Viewer Dialog -->
    <q-dialog v-model="contractViewerDialog" full-width>
      <q-card class="full-width">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Contract File</div>
          <q-space />
          <q-btn icon="open_in_new" flat round dense @click="openContractInNewTab">
            <q-tooltip>Open in New Tab</q-tooltip>
          </q-btn>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="contract-viewer" style="height: 80vh">
            <iframe
              v-if="contractUrl"
              :src="contractUrl"
              style="width: 100%; height: 100%; border: none"
            ></iframe>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useCasesStore } from 'stores/casemanager/casesStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'CasesPage',

  setup() {
    const casesStore = useCasesStore()
    const router = useRouter()
    const $q = useQuasar()
    const showError = computed(() => casesStore.hasError)
    const role_id = JSON.parse(localStorage.getItem('user')).role_id
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

    const newCaseDialog = ref(false)
    const step = ref(1)
    const submitting = ref(false)
    const uploading = ref(false)
    const caseManagers = ref([])
    const clients = ref([])
    const newCaseId = ref(null)
    const user_role = JSON.parse(localStorage.getItem('user')).role_id
    const newCaseForm = ref({
      bill: null,
      case_manager_id: null,
      user_id: null,
      description: '',
    })

    const contractFile = ref(null)

    const contractUploadDialog = ref(false)
    const editCaseDialog = ref(false)
    const selectedCase = ref(null)
    const editCaseForm = ref({
      bill: null,
      case_manager_id: null,
      user_id: null,
      description: '',
    })

    const contractViewerDialog = ref(false)
    const contractUrl = ref(null)

    // Load cases when component mounts
    onMounted(async () => {
      await casesStore.fetchCases()
      fetchUsers()
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

    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/admin/users')
        console.log('API Response:', response.data) // Debug log

        // Safely map and filter users
        caseManagers.value = response.data.data
          .map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            value: user.id,
            label: `${user.name} (${user.email})`,
            roles: user.roles || [],
          }))
          .filter((user) => Array.isArray(user.roles) && user.roles.includes('Case Manager'))

        clients.value = response.data.data
          .map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            value: user.id,
            label: `${user.name} (${user.email})`,
            roles: user.roles || [],
          }))
          .filter((user) => Array.isArray(user.roles) && user.roles.includes('Guest'))

        console.log('Case Managers:', caseManagers.value) // Debug log
        console.log('Clients:', clients.value) // Debug log
      } catch (error) {
        console.error('Error fetching users:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load users',
          position: 'top',
        })
      }
    }

    const openNewCaseDialog = () => {
      step.value = 1
      newCaseForm.value = {
        bill: null,
        case_manager_id: null,
        user_id: null,
        description: '',
      }
      contractFile.value = null
      newCaseDialog.value = true
    }

    const submitNewCase = async () => {
      submitting.value = true
      try {
        console.log('Submitting case:', newCaseForm.value)

        const response = await api.post('/api/admin/createcase', {
          ...newCaseForm.value,
          case_manager_id: Number(newCaseForm.value.case_manager_id),
          user_id: Number(newCaseForm.value.user_id),
        })

        newCaseId.value = response.data.data.case.id
        step.value = 2

        $q.notify({
          type: 'positive',
          message: 'Case created successfully',
          position: 'top',
        })
      } catch (error) {
        console.error('Error creating case:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to create case',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    const uploadContract = async () => {
      if (!contractFile.value) return

      uploading.value = true
      const formData = new FormData()
      formData.append('contract_file', contractFile.value)

      try {
        await api.post(`/api/admin/update/${newCaseId.value}/contractfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        $q.notify({
          type: 'positive',
          message: 'Contract uploaded successfully',
          position: 'top',
        })

        newCaseDialog.value = false
        await casesStore.fetchCases()
      } catch (error) {
        console.error('Error uploading contract:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to upload contract',
          position: 'top',
        })
      } finally {
        uploading.value = false
      }
    }

    const openContractUploadDialog = (caseData) => {
      selectedCase.value = caseData
      contractFile.value = null
      contractUploadDialog.value = true
    }

    const uploadContractFile = async () => {
      if (!contractFile.value) return

      uploading.value = true
      const formData = new FormData()
      formData.append('contract_file', contractFile.value)

      try {
        await api.post(`/api/admin/update/${selectedCase.value.id}/contractfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        $q.notify({
          type: 'positive',
          message: 'Contract file uploaded successfully',
          position: 'top',
        })

        contractUploadDialog.value = false
        await casesStore.fetchCases()
      } catch (error) {
        console.error('Error uploading contract:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to upload contract',
          position: 'top',
        })
      } finally {
        uploading.value = false
      }
    }

    const openEditCaseDialog = (caseData) => {
      selectedCase.value = caseData
      editCaseForm.value = {
        bill: caseData.bill,
        case_manager_id: caseData.case_manager_id,
        user_id: caseData.user_id,
        description: caseData.description,
      }
      editCaseDialog.value = true
    }

    const updateCase = async () => {
      submitting.value = true
      try {
        await api.patch(`/api/admin/updatecase/${selectedCase.value.id}`, editCaseForm.value)

        $q.notify({
          type: 'positive',
          message: 'Case updated successfully',
          position: 'top',
        })

        editCaseDialog.value = false
        await casesStore.fetchCases()
      } catch (error) {
        console.error('Error updating case:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to update case',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    const openContractViewer = (caseData) => {
      selectedCase.value = caseData
      // Construct the URL using the base URL from your API configuration
      if (caseData.contract_file) {
        // Use the full URL if it's provided in the response
        if (caseData.contract_file_url) {
          contractUrl.value = caseData.contract_file_url
        } else {
          // Construct the URL using your API base URL
          const baseUrl = process.env.VUE_APP_API_URL || ''
          contractUrl.value = `${baseUrl}/storage/${caseData.contract_file}`
        }

        console.log('Contract URL:', contractUrl.value) // Debug log
        contractViewerDialog.value = true
      } else {
        $q.notify({
          type: 'warning',
          message: 'No contract file available',
          position: 'top',
        })
      }
    }

    const openContractInNewTab = () => {
      if (contractUrl.value) {
        window.open(contractUrl.value, '_blank')
      }
    }

    return {
      casesStore,
      role_id,
      columns,
      showError,
      onRequest,
      viewCase,
      editCase,
      deleteCase,
      newCaseDialog,
      step,
      submitting,
      uploading,
      caseManagers,
      clients,
      newCaseForm,
      contractFile,
      newCaseId,
      contractUploadDialog,
      editCaseDialog,
      selectedCase,
      editCaseForm,
      openNewCaseDialog,
      submitNewCase,
      uploadContract,
      openContractUploadDialog,
      uploadContractFile,
      openEditCaseDialog,
      updateCase,
      contractViewerDialog,
      contractUrl,
      openContractViewer,
      openContractInNewTab,
      user_role,
    }
  },
}
</script>

<style lang="scss" scoped>
.cases {
  padding: 20px;
}

.contract-viewer {
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

/* Optional: Add loading animation */
.contract-viewer::before {
  content: 'Loading...';
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.contract-viewer iframe {
  position: relative;
  z-index: 2;
}
</style>
