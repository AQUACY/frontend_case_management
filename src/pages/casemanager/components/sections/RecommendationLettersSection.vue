<template>
  <div class="recommendation-letters-section q-pa-md">
    <q-card flat bordered>
      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="green" size="3em" />
        <div class="text-grey q-mt-md">Loading recommendation letters...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="green" label="Retry" @click="fetchRecommenders" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <div class="text-h6 q-mb-lg">Recommendation Letters</div>

        <!-- Status Summary -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md-4">
            <q-card class="bg-green-1">
              <q-card-section class="text-center">
                <div class="text-h6 text-green">{{ totalRecommenders }}</div>
                <div class="text-subtitle2">Total Recommenders</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="bg-orange-1">
              <q-card-section class="text-center">
                <div class="text-h6 text-orange">{{ pendingCount }}</div>
                <div class="text-subtitle2">Pending</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="bg-positive-1">
              <q-card-section class="text-center">
                <div class="text-h6 text-positive">{{ finalizedCount }}</div>
                <div class="text-subtitle2">Finalized</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Recommenders List -->
        <div v-if="recommenders.length > 0">
          <div v-for="recommender in recommenders" :key="recommender.id" class="q-mb-lg">
            <q-card bordered>
              <q-card-section>
                <!-- Header -->
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6">{{ recommender.name }}</div>
                  <div class="row items-center q-gutter-sm">
                    <!-- Status Update Button (only shows for pending status) -->
                    <q-btn
                      v-if="recommender.status === 'pending'"
                      color="primary"
                      :loading="updatingId === recommender.id"
                      @click="showStatusDialog(recommender)"
                      icon="edit"
                      label="Update Status"
                      size="sm"
                    />

                    <!-- Status Badge -->
                    <q-badge
                      :color="recommender.status === 'finalized' ? 'positive' : 'orange'"
                      class="text-capitalize"
                    >
                      {{ recommender.status }}
                    </q-badge>
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <!-- Basic Information -->
                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Title</q-item-label>
                          <q-item-label>
                            <q-badge :color="getBadgeColor(recommender.title)">
                              {{ formatValue(recommender.title) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Institution</q-item-label>
                          <q-item-label>
                            <q-badge :color="getBadgeColor(recommender.institution)">
                              {{ formatValue(recommender.institution) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Country</q-item-label>
                          <q-item-label>
                            <q-badge :color="getBadgeColor(recommender.country)">
                              {{ formatValue(recommender.country) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Dependency Status</q-item-label>
                          <q-item-label>
                            <q-badge :color="getBadgeColor(recommender.dependent_or_independent)">
                              {{ formatValue(recommender.dependent_or_independent) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Links -->
                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Faculty Biography</q-item-label>
                          <q-item-label>
                            <q-badge :color="getBadgeColor(recommender.faculty_biography_link)">
                              {{ formatValue(recommender.faculty_biography_link) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Google Scholar</q-item-label>
                          <q-item-label>
                            {{ formatValue(recommender.google_scholar_link) }}
                            <q-btn
                              v-if="recommender.google_scholar_link"
                              flat
                              round
                              icon="launch"
                              :href="recommender.google_scholar_link"
                              target="_blank"
                              size="sm"
                            />
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Project Details -->
                  <div class="col-12">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Projects Discussed</q-item-label>
                          <q-item-label class="text-wrap">
                            <q-badge :color="getBadgeColor(recommender.projects_discussed)">
                              {{ formatValue(recommender.projects_discussed) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12">
                    <q-list bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Cited Project Details</q-item-label>
                          <q-item-label class="text-wrap">
                            <q-badge :color="getBadgeColor(recommender.cited_project_details)">
                              {{ formatValue(recommender.cited_project_details) }}
                            </q-badge>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div v-else class="text-center q-pa-md">
          <q-icon name="description" size="4em" color="grey-5" />
          <div class="text-grey q-mt-sm">No recommendation letters available</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Add this dialog component at the end of the template -->
    <q-dialog v-model="statusDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">Update Recommender Status</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="text-body1">
            Update status for recommender: <strong>{{ selectedRecommender?.name }}</strong>
          </p>
          <q-option-group
            v-model="newStatus"
            :options="[
              {
                label: 'Mark as Finalized',
                value: 'finalized',
                color: 'positive',
              },
              {
                label: 'Keep as Pending',
                value: 'pending',
                color: 'orange',
              },
            ]"
            color="primary"
            type="radio"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Update" :loading="updating" @click="updateStatus" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'RecommendationLettersSection',

  props: {
    caseId: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar()
    const loading = ref(false)
    const error = ref(null)
    const recommenders = ref([])
    const updatingId = ref(null)
    const updating = ref(false)
    const statusDialog = ref(false)
    const selectedRecommender = ref(null)
    const newStatus = ref('pending')

    const totalRecommenders = computed(() => recommenders.value.length)
    const pendingCount = computed(
      () => recommenders.value.filter((r) => r.status === 'pending').length,
    )
    const finalizedCount = computed(
      () => recommenders.value.filter((r) => r.status === 'finalized').length,
    )

    const formatValue = (value) => {
      return value || 'Not Provided'
    }

    const getBadgeColor = (value) => {
      return value ? 'primary' : 'grey-7'
    }

    const fetchRecommenders = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/cases/${props.caseId}/recommenders`)
        recommenders.value = response.data.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading recommenders. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load recommenders',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    const showStatusDialog = (recommender) => {
      selectedRecommender.value = recommender
      newStatus.value = recommender.status
      statusDialog.value = true
    }

    const updateStatus = async () => {
      updating.value = true
      updatingId.value = selectedRecommender.value.id

      try {
        const response = await api.patch(
          `/api/cases/${props.caseId}/recommenders/${selectedRecommender.value.id}`,
          {
            status: newStatus.value,
          },
        )
        selectedRecommender.value.status = newStatus.value
        $q.notify({
          type: 'positive',
          message: 'Recommender status updated successfully',
          position: 'top',
        })
        console.log(response)
      } catch (err) {
        console.error(err)
        error.value = 'Error updating recommender status. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to update recommender status',
          position: 'top',
        })
      } finally {
        updating.value = false
        updatingId.value = null
        statusDialog.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchRecommenders()
      }
    })

    return {
      loading,
      error,
      recommenders,
      totalRecommenders,
      pendingCount,
      finalizedCount,
      formatValue,
      getBadgeColor,
      fetchRecommenders,
      updatingId,
      updating,
      statusDialog,
      selectedRecommender,
      newStatus,
      showStatusDialog,
      updateStatus,
    }
  },
}
</script>

<style lang="scss" scoped>
.recommendation-letters-section {
  :deep(.q-field--readonly) {
    .q_field__native {
      color: $grey-8;
    }

    .q_field__label {
      color: $grey-7;
    }
  }
}
</style>
