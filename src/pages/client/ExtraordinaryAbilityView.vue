<template>
  <q-page class="q-pa-md">
    <div class="extraordinary-container">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-green">Extraordinary Ability Evidence</div>
          <div class="text-caption text-grey q-mt-sm">
            Please provide information about your extraordinary abilities and achievements.
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="saveAll">
            <!-- Awards Section -->
            <div class="q-mb-lg">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">1. National or International Awards</div>
                <q-btn
                  v-if="formData.has_awards === 'Yes'"
                  color="green"
                  icon="add"
                  label="Add Award"
                  @click="openAddDialog('award')"
                />
              </div>

              <div class="row q-mb-md">
                <q-radio
                  v-model="formData.has_awards"
                  val="Yes"
                  label="Yes"
                  class="q-mr-md"
                  @update:model-value="handleSectionToggle('awards')"
                />
                <q-radio
                  v-model="formData.has_awards"
                  val="No"
                  label="No"
                  @update:model-value="handleSectionToggle('awards')"
                />
              </div>

              <div v-if="formData.has_awards === 'Yes'" class="q-mt-md">
                <q-table :rows="formData.awards" :columns="awardColumns" row-key="id" flat bordered>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          round
                          color="info"
                          icon="visibility"
                          @click="viewItem('award', props.row)"
                        >
                          <q-tooltip>View Details</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="edit"
                          @click="editItem('award', props.row)"
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="negative"
                          icon="delete"
                          @click="confirmDelete('award', props.row)"
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>

            <!-- Memberships Section -->
            <div class="q-mb-lg">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">2. Professional Memberships</div>
                <q-btn
                  v-if="formData.has_memberships === 'Yes'"
                  color="green"
                  icon="add"
                  label="Add Membership"
                  @click="openAddDialog('membership')"
                />
              </div>

              <div class="row q-mb-md">
                <q-radio
                  v-model="formData.has_memberships"
                  val="Yes"
                  label="Yes"
                  class="q-mr-md"
                  @update:model-value="handleSectionToggle('memberships')"
                />
                <q-radio
                  v-model="formData.has_memberships"
                  val="No"
                  label="No"
                  @update:model-value="handleSectionToggle('memberships')"
                />
              </div>

              <div v-if="formData.has_memberships === 'Yes'" class="q-mt-md">
                <q-table
                  :rows="formData.memberships"
                  :columns="membershipColumns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          round
                          color="info"
                          icon="visibility"
                          @click="viewItem('membership', props.row)"
                        >
                          <q-tooltip>View Details</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="edit"
                          @click="editItem('membership', props.row)"
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="negative"
                          icon="delete"
                          @click="confirmDelete('membership', props.row)"
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>

            <!-- Media Coverage Section -->
            <div class="q-mb-lg">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">3. Media Coverage</div>
                <q-btn
                  v-if="formData.has_media_coverage === 'Yes'"
                  color="green"
                  icon="add"
                  label="Add Media Coverage"
                  @click="openAddDialog('media_coverage')"
                />
              </div>

              <div class="row q-mb-md">
                <q-radio
                  v-model="formData.has_media_coverage"
                  val="Yes"
                  label="Yes"
                  class="q-mr-md"
                  @update:model-value="handleSectionToggle('media_coverages')"
                />
                <q-radio
                  v-model="formData.has_media_coverage"
                  val="No"
                  label="No"
                  @update:model-value="handleSectionToggle('media_coverages')"
                />
              </div>

              <div v-if="formData.has_media_coverage === 'Yes'" class="q-mt-md">
                <q-table
                  :rows="formData.media_coverages"
                  :columns="mediaCoverageColumns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          round
                          color="info"
                          icon="visibility"
                          @click="viewItem('media_coverage', props.row)"
                        >
                          <q-tooltip>View Details</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="edit"
                          @click="editItem('media_coverage', props.row)"
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="negative"
                          icon="delete"
                          @click="confirmDelete('media_coverage', props.row)"
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>

            <!-- Speaking Engagements Section -->
            <div class="q-mb-lg">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">4. Speaking Engagements</div>
                <q-btn
                  v-if="formData.has_speaking_engagements === 'Yes'"
                  color="green"
                  icon="add"
                  label="Add Speaking Engagement"
                  @click="openAddDialog('speaking_engagement')"
                />
              </div>

              <div class="row q-mb-md">
                <q-radio
                  v-model="formData.has_speaking_engagements"
                  val="Yes"
                  label="Yes"
                  class="q-mr-md"
                  @update:model-value="handleSectionToggle('speaking_engagements')"
                />
                <q-radio
                  v-model="formData.has_speaking_engagements"
                  val="No"
                  label="No"
                  @update:model-value="handleSectionToggle('speaking_engagements')"
                />
              </div>

              <div v-if="formData.has_speaking_engagements === 'Yes'" class="q-mt-md">
                <q-table
                  :rows="formData.speaking_engagements"
                  :columns="speakingEngagementColumns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          round
                          color="info"
                          icon="visibility"
                          @click="viewItem('speaking_engagement', props.row)"
                        >
                          <q-tooltip>View Details</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="edit"
                          @click="editItem('speaking_engagement', props.row)"
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="negative"
                          icon="delete"
                          @click="confirmDelete('speaking_engagement', props.row)"
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>

            <!-- Leadership Roles Section -->
            <div class="q-mb-lg">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">5. Leadership Roles</div>
                <q-btn
                  v-if="formData.has_leadership_roles === 'Yes'"
                  color="green"
                  icon="add"
                  label="Add Leadership Role"
                  @click="openAddDialog('leadership_role')"
                />
              </div>

              <div class="row q-mb-md">
                <q-radio
                  v-model="formData.has_leadership_roles"
                  val="Yes"
                  label="Yes"
                  class="q-mr-md"
                  @update:model-value="handleSectionToggle('leadership_roles')"
                />
                <q-radio
                  v-model="formData.has_leadership_roles"
                  val="No"
                  label="No"
                  @update:model-value="handleSectionToggle('leadership_roles')"
                />
              </div>

              <div v-if="formData.has_leadership_roles === 'Yes'" class="q-mt-md">
                <q-table
                  :rows="formData.leadership_roles"
                  :columns="leadershipRoleColumns"
                  row-key="id"
                  flat
                  bordered
                >
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          round
                          color="info"
                          icon="visibility"
                          @click="viewItem('leadership_role', props.row)"
                        >
                          <q-tooltip>View Details</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="edit"
                          @click="editItem('leadership_role', props.row)"
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          color="negative"
                          icon="delete"
                          @click="confirmDelete('leadership_role', props.row)"
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>

            <!-- Save All Button -->
            <div class="row justify-end q-mt-lg">
              <q-btn
                color="green"
                icon="save"
                label="Save All"
                :loading="saving.all"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <!-- Dialog for Add/Edit -->
      <q-dialog v-model="dialog.show" persistent>
        <q-card style="min-width: 600px; max-width: 90vw">
          <q-card-section class="row items-center bg-primary text-white">
            <div class="text-h6">{{ dialog.title }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pa-md">
            <component
              :is="dialog.component"
              :item="dialog.item"
              @save="handleSave"
              @cancel="dialog.show = false"
            />
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Dialog for View -->
      <q-dialog v-model="viewDialog.show">
        <q-card style="min-width: 500px">
          <q-card-section class="row items-center bg-primary text-white">
            <div class="text-h6">{{ viewDialog.title }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pa-md">
            <div v-for="(value, key) in viewDialog.data" :key="key" class="q-mb-md">
              <div class="text-weight-medium text-primary">{{ key }}</div>
              <div class="q-pl-sm" style="white-space: pre-wrap">{{ value }}</div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Confirm Delete Dialog -->
      <q-dialog v-model="confirmDialog.show" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="warning" text-color="white" />
            <span class="q-ml-sm">Are you sure you want to delete this item?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="negative" @click="handleDelete" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useExtraordinaryStore } from 'src/stores/extraordinary'
import AwardForm from 'src/components/forms/AwardForm.vue'
import MembershipForm from 'src/components/forms/MembershipForm.vue'
import MediaCoverageForm from 'src/components/forms/MediaCoverageForm.vue'
import SpeakingEngagementForm from 'src/components/forms/SpeakingEngagementForm.vue'
import LeadershipRoleForm from 'src/components/forms/LeadershipRoleForm.vue'
import { date } from 'quasar'

export default {
  name: 'ExtraordinaryAbilityView',

  components: {
    AwardForm,
    MembershipForm,
    MediaCoverageForm,
    SpeakingEngagementForm,
    LeadershipRoleForm,
  },

  setup() {
    const $q = useQuasar()
    const store = useExtraordinaryStore()

    const formData = ref({
      has_awards: 'No',
      has_memberships: 'No',
      has_media_coverage: 'No',
      has_speaking_engagements: 'No',
      has_leadership_roles: 'No',
      awards: [],
      memberships: [],
      media_coverages: [],
      speaking_engagements: [],
      leadership_roles: [],
    })

    // Dialog states
    const dialog = ref({
      show: false,
      title: '',
      component: null,
      item: null,
      type: '',
    })

    const viewDialog = ref({
      show: false,
      title: '',
      data: null,
    })

    const confirmDialog = ref({
      show: false,
      type: '',
      item: null,
    })

    // Format date helper
    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      return date.formatDate(dateStr, 'MMMM D, YYYY')
    }

    // Table Columns with improved formatting
    const awardColumns = [
      {
        name: 'award_name',
        label: 'Award Name',
        field: 'award_name',
        align: 'left',
        style: 'width: 30%',
      },
      {
        name: 'awarding_institution',
        label: 'Institution',
        field: 'awarding_institution',
        align: 'left',
        style: 'width: 30%',
      },
      {
        name: 'award_recipient',
        label: 'Recipient',
        field: 'award_recipient',
        align: 'left',
        style: 'width: 30%',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 10%',
      },
    ]

    const membershipColumns = [
      {
        name: 'membership_level',
        label: 'Level',
        field: 'membership_level',
        align: 'left',
        style: 'width: 40%',
      },
      {
        name: 'membership_requirements',
        label: 'Requirements',
        field: (row) => row.membership_requirements.substring(0, 100) + '...',
        align: 'left',
        style: 'width: 50%',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 10%',
      },
    ]

    const mediaCoverageColumns = [
      {
        name: 'media_name',
        label: 'Media Name',
        field: 'media_name',
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'date_published',
        label: 'Date',
        field: (row) => formatDate(row.date_published),
        align: 'left',
        style: 'width: 20%',
      },
      {
        name: 'outlet_name',
        label: 'Outlet',
        field: 'outlet_name',
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'author',
        label: 'Author',
        field: 'author',
        align: 'left',
        style: 'width: 20%',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 10%',
      },
    ]

    const speakingEngagementColumns = [
      {
        name: 'conference_name',
        label: 'Conference',
        field: 'conference_name',
        align: 'left',
        style: 'width: 40%',
      },
      {
        name: 'engagement_date',
        label: 'Date',
        field: (row) => formatDate(row.engagement_date),
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'details',
        label: 'Details',
        field: (row) => row.details.substring(0, 50) + '...',
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 10%',
      },
    ]

    const leadershipRoleColumns = [
      {
        name: 'role_position',
        label: 'Position',
        field: 'role_position',
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'organization_name',
        label: 'Organization',
        field: 'organization_name',
        align: 'left',
        style: 'width: 25%',
      },
      {
        name: 'service_period',
        label: 'Service Period',
        field: (row) =>
          `${formatDate(row.service_start_date)} - ${formatDate(row.service_end_date) || 'Present'}`,
        align: 'left',
        style: 'width: 40%',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 10%',
      },
    ]

    const saving = ref({
      all: false,
      awards: false,
      memberships: false,
      media_coverages: false,
      speaking_engagements: false,
      leadership_roles: false,
    })

    // Dialog handlers
    const getComponentName = (type) => {
      switch (type) {
        case 'award':
          return 'AwardForm'
        case 'membership':
          return 'MembershipForm'
        case 'media_coverage':
          return 'MediaCoverageForm'
        case 'speaking_engagement':
          return 'SpeakingEngagementForm'
        case 'leadership_role':
          return 'LeadershipRoleForm'
        default:
          return null
      }
    }

    const editItem = (type, item) => {
      dialog.value = {
        show: true,
        title: `Edit ${formatLabel(type)}`,
        component: getComponentName(type),
        item: { ...item },
        type,
      }
    }

    const openAddDialog = (type) => {
      dialog.value = {
        show: true,
        title: `Add ${formatLabel(type)}`,
        component: getComponentName(type),
        item: null,
        type,
      }
    }

    const viewItem = (type, item) => {
      let formattedData = {}

      switch (type) {
        case 'award':
          formattedData = {
            'Award Name': item.award_name,
            'Award Recipient': item.award_recipient,
            'Awarding Institution': item.awarding_institution,
            'Award Criteria': item.award_criteria,
            'Award Significance': item.award_significance,
            'Number of Recipients': item.number_of_recipients,
            'Competitor Limitations': item.competitor_limitations,
          }
          break
        case 'membership':
          formattedData = {
            'Membership Level': item.membership_level,
            Requirements: item.membership_requirements,
            'Fee and Subscription Details': item.fee_and_subscription_details,
          }
          break
        case 'media_coverage':
          formattedData = {
            'Media Name': item.media_name,
            'Date Published': formatDate(item.date_published),
            Author: item.author,
            'Outlet Name': item.outlet_name,
            'Circulation Count': item.circulation_count,
            'Article Summary': item.article_summary,
            'Work Relevance': item.work_relevance,
          }
          break
        case 'speaking_engagement':
          formattedData = {
            'Conference Name': item.conference_name,
            'Engagement Date': formatDate(item.engagement_date),
            Details: item.details,
          }
          break
        case 'leadership_role':
          formattedData = {
            'Role Position': item.role_position,
            'Organization Name': item.organization_name,
            'Service Period': `${formatDate(item.service_start_date)} - ${formatDate(item.service_end_date) || 'Present'}`,
            'Organization Prestige': item.organization_prestige,
            'Role Summary': item.role_summary,
          }
          break
      }

      viewDialog.value = {
        show: true,
        title: `${formatLabel(type)} Details`,
        data: formattedData,
      }
    }

    const confirmDelete = (type, item) => {
      confirmDialog.value = {
        show: true,
        type,
        item,
      }
    }

    const handleDelete = async () => {
      try {
        const { type, item } = confirmDialog.value
        switch (type) {
          case 'award':
            await store.deleteAward(item.id)
            break
          case 'membership':
            await store.deleteMembership(item.id)
            break
          case 'media_coverage':
            await store.deleteMediaCoverage(item.id)
            break
          case 'speaking_engagement':
            await store.deleteSpeakingEngagement(item.id)
            break
          case 'leadership_role':
            await store.deleteLeadershipRole(item.id)
            break
        }
        await loadData()
        $q.notify({
          type: 'positive',
          message: 'Item deleted successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete item',
        })
      }
    }

    const handleSave = async (data) => {
      try {
        const { type, item } = dialog.value
        if (item?.id) {
          // Update
          await store.updateComponent(type, item.id, data)
        } else {
          // Create
          await store.saveComponent(type, data)
        }
        dialog.value.show = false
        await loadData()
        $q.notify({
          type: 'positive',
          message: 'Saved successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save',
        })
      }
    }

    const formatLabel = (key) => {
      return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    // Load initial data
    const loadData = async () => {
      try {
        const data = await store.fetchExtraordinary()
        if (data) {
          formData.value = {
            // Set 'Yes' if there's data in the corresponding arrays, otherwise use the API value or 'No'
            has_awards: data.awards?.length > 0 ? 'Yes' : data.has_awards ? 'Yes' : 'No',
            has_memberships:
              data.memberships?.length > 0 ? 'Yes' : data.has_memberships ? 'Yes' : 'No',
            has_media_coverage:
              data.media_coverages?.length > 0 ? 'Yes' : data.has_media_coverage ? 'Yes' : 'No',
            has_speaking_engagements:
              data.speaking_engagements?.length > 0
                ? 'Yes'
                : data.has_speaking_engagements
                  ? 'Yes'
                  : 'No',
            has_leadership_roles:
              data.leadership_roles?.length > 0 ? 'Yes' : data.has_leadership_roles ? 'Yes' : 'No',
            // Store the actual data arrays
            awards: data.awards || [],
            memberships: data.memberships || [],
            media_coverages: data.media_coverages || [],
            speaking_engagements: data.speaking_engagements || [],
            leadership_roles: data.leadership_roles || [],
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load data',
        })
      }
    }

    // Handle section toggle (Yes/No)
    const handleSectionToggle = async (section) => {
      try {
        const hasField = `has_${section}`

        // Only clear the data if explicitly set to 'No'
        if (formData.value[hasField] === 'No') {
          // Check if there's existing data before clearing
          if (formData.value[section]?.length > 0) {
            // Ask for confirmation before clearing data
            const confirm = await $q
              .dialog({
                title: 'Confirm Action',
                message: `Setting this to No will clear all existing ${formatLabel(section)}. Are you sure?`,
                cancel: true,
                persistent: true,
              })
              .onOk(() => true)
              .onCancel(() => false)

            if (!confirm) {
              // If user cancels, revert the toggle
              formData.value[hasField] = 'Yes'
              return
            }
          }
          formData.value[section] = []
        }

        await store.saveExtraordinary({
          [hasField]: formData.value[hasField],
        })
      } catch (error) {
        console.error(`Error toggling ${section}:`, error)
        $q.notify({
          type: 'negative',
          message: `Failed to update ${section} status`,
        })
      }
    }

    // Save all sections
    const saveAll = async () => {
      try {
        saving.value.all = true
        await store.saveExtraordinary(formData.value)
        $q.notify({
          type: 'positive',
          message: 'All data saved successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save data',
        })
      } finally {
        saving.value.all = false
      }
    }

    onMounted(loadData)

    return {
      formData,
      dialog,
      viewDialog,
      confirmDialog,
      awardColumns,
      membershipColumns,
      mediaCoverageColumns,
      speakingEngagementColumns,
      leadershipRoleColumns,
      openAddDialog,
      editItem,
      viewItem,
      confirmDelete,
      handleDelete,
      handleSave,
      formatLabel,
      saving,
      handleSectionToggle,
      saveAll,
      formatDate,
    }
  },
}
</script>

<style scoped>
.extraordinary-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<style>
.q-table th {
  font-weight: bold;
}

.q-table td {
  white-space: normal;
  word-break: break-word;
}

.q-dialog__inner--minimized {
  padding: 0;
}
</style>
