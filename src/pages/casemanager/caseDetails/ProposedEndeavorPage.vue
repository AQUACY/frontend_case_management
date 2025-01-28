<template>
  <div class="proposed-endeavor q-pa-md">
    <q-card flat bordered>
      <q-card-section class="bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-sm">
            <q-btn icon="arrow_back" flat round @click="$router.back()" />
            <div class="text-h6">Proposed Endeavor Review</div>
          </div>
          <div class="row items-center q-gutter-md">
            <q-select
              v-model="reviewDecision"
              :options="reviewOptions"
              label="Review Decision"
              outlined
              dense
              dark
              class="bg-primary"
              style="min-width: 200px"
            />
            <q-btn
              :loading="submitting"
              :disable="!reviewDecision"
              color="white"
              text-color="primary"
              label="Submit Review"
              @click="submitReview"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="loading">
        <div class="row justify-center q-pa-md">
          <q-spinner color="primary" size="3em" />
        </div>
      </q-card-section>

      <template v-else-if="endeavorData">
        <!-- Status Indicator -->
        <q-card-section class="q-pb-none">
          <q-chip :color="getStatusColor" text-color="white" class="text-weight-medium">
            Status: {{ endeavorData.status }}
          </q-chip>
        </q-card-section>

        <!-- Main Content -->
        <q-card-section>
          <div class="row q-col-gutter-md">
            <!-- Type Selection -->
            <div class="col-12">
              <div class="text-subtitle2 text-weight-medium">Selected Visa Types</div>
              <div class="q-mt-sm">
                <q-chip
                  v-for="type in parsedTypes"
                  :key="type"
                  color="primary"
                  text-color="white"
                  size="sm"
                >
                  {{ type }}
                </q-chip>
              </div>
            </div>

            <!-- Proposed Endeavor Fields -->
            <div class="col-12">
              <div class="text-subtitle2 text-weight-medium q-mb-sm">Proposed Endeavor Details</div>
              <q-card flat bordered>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption
                        >Part One : The active verb(s) describing your methodical approach
                      </q-item-label>
                      <q-item-label>{{ endeavorData.proposed_endavor_field_1 }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item>
                    <q-item-section>
                      <q-item-label caption
                        >Part Two: The main topic/specific subject of your research</q-item-label
                      >
                      <q-item-label>{{ endeavorData.proposed_endavor_field_2 }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item>
                    <q-item-section>
                      <q-item-label caption
                        >Part Three: the impact of your proposed research on the field /and or its
                        real world application</q-item-label
                      >
                      <q-item-label>{{ endeavorData.proposed_endavor_field_3 }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>

            <!-- Experience and Plans -->
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 text-weight-medium q-mb-sm">Past Experience Statement</div>
              <q-card flat bordered class="q-pa-md">
                {{ endeavorData.past_experience }}
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-subtitle2 text-weight-medium q-mb-sm">
                Publication Plans Statement
              </div>
              <q-card flat bordered class="q-pa-md">
                {{ endeavorData.publication_plans }}
              </q-card>
            </div>

            <!-- Current Status Section -->
            <div class="col-12">
              <div class="text-subtitle2 text-weight-medium q-mb-sm">
                Employment Status
                <q-tooltip>
                  <div>Status colors:</div>
                  <div class="text-positive">Green - Yes</div>
                  <div class="text-negative">Red - No</div>
                  <div class="text-warning">Orange - Not specified</div>
                </q-tooltip>
              </div>
              <div class="row q-col-gutter-sm">
                <template v-for="(value, key) in currentStatusFieldsforyes" :key="key">
                  <div v-if="value === 'yes'" class="col-12 col-sm-6 col-md-4">
                    <q-chip color="positive" text-color="white" size="sm" class="full-width">
                      {{ formatStatusLabel(key) }}
                    </q-chip>
                  </div>
                </template>
                <template v-for="(value, key) in currentStatusFieldsforno" :key="key">
                  <div v-if="value === 'no'" class="col-12 col-sm-6 col-md-4">
                    <q-chip color="negative" text-color="white" size="sm" class="full-width">
                      {{ formatStatusLabel(key) }}
                    </q-chip>
                  </div>
                </template>
                <template v-for="(value, key) in currentStatusFieldsfornull" :key="key">
                  <div v-if="value === null" class="col-12 col-sm-6 col-md-4">
                    <q-chip color="orange" text-color="white" size="sm" class="full-width">
                      {{ formatStatusLabel(key) }}
                    </q-chip>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </q-card-section>
      </template>

      <q-card-section v-else class="text-center text-grey">
        No endeavor data available
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'ProposedEndeavorPage',

  setup() {
    const route = useRoute()
    const $q = useQuasar()
    const loading = ref(false)
    const submitting = ref(false)
    const endeavorData = ref(null)
    const reviewDecision = ref(null)

    const reviewOptions = ['approved', 'rejected', 'pending']

    const getStatusColor = computed(() => {
      switch (endeavorData.value?.status) {
        case 'approved':
          return 'positive'
        case 'rejected':
          return 'negative'
        default:
          return 'warning'
      }
    })

    const parsedTypes = computed(() => {
      if (!endeavorData.value?.type) return []
      try {
        return JSON.parse(endeavorData.value.type)
      } catch {
        return []
      }
    })

    const currentStatusFieldsforyes = computed(() => {
      if (!endeavorData.value) return {}
      return Object.fromEntries(
        Object.entries(endeavorData.value).filter(
          ([key, value]) => key.startsWith('currently_') && value === 'yes',
        ),
      )
    })

    const currentStatusFieldsforno = computed(() => {
      if (!endeavorData.value) return {}
      return Object.fromEntries(
        Object.entries(endeavorData.value).filter(
          ([key, value]) => key.startsWith('currently_') && value === 'no',
        ),
      )
    })

    const currentStatusFieldsfornull = computed(() => {
      if (!endeavorData.value) return {}
      return Object.fromEntries(
        Object.entries(endeavorData.value).filter(
          ([key, value]) => key.startsWith('currently_') && value === null,
        ),
      )
    })

    const formatStatusLabel = (key) => {
      return key
        .replace(/_/g, ' ')
        .replace(/currently/i, '')
        .replace(/(niw|eb1a|eb1b|o1)$/i, '')
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const fetchEndeavorData = async () => {
      loading.value = true
      try {
        const response = await api.get(
          `/api/auth/cases/${route.params?.id || ''}/getendavorrecords`,
        )
        endeavorData.value = response.data.record
      } catch (error) {
        console.error('Error fetching endeavor data:', error)
      } finally {
        loading.value = false
      }
    }

    const submitReview = async () => {
      if (!reviewDecision.value) return

      submitting.value = true
      try {
        await api.post(`/api/auth/cases/${route.params.id}/review-response`, {
          response: reviewDecision.value,
        })

        // Update local state
        if (endeavorData.value) {
          endeavorData.value.status = reviewDecision.value
        }

        $q.notify({
          type: 'positive',
          message: 'Review submitted successfully',
          position: 'top',
        })
      } catch (error) {
        console.error('Error submitting review:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to submit review',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    onMounted(() => {
      fetchEndeavorData()
    })

    return {
      loading,
      submitting,
      endeavorData,
      reviewDecision,
      reviewOptions,
      getStatusColor,
      parsedTypes,
      currentStatusFieldsforyes,
      currentStatusFieldsforno,
      currentStatusFieldsfornull,
      formatStatusLabel,
      submitReview,
    }
  },
}
</script>

<style lang="scss" scoped>
.proposed-endeavor {
  .q-chip {
    margin: 4px;
  }
}
</style>
