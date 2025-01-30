<template>
  <div class="background-info">
    <!-- Review Section -->
    <review-section
      :current-status="backgroundData?.status"
      :submitting="submitting"
      @submit-review="handleReview"
    />

    <div v-if="loading" class="row justify-center q-pa-md">
      <q-spinner color="green" size="3em" />
    </div>

    <template v-else-if="backgroundData">
      <!-- Status Chip -->
      <div class="q-mb-md">
        <q-chip
          :color="getStatusColor(backgroundData.status)"
          text-color="white"
          class="text-weight-medium"
        >
          Status: {{ backgroundData.status }}
        </q-chip>
      </div>

      <!-- Main Academic Field Section -->
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Main Academic Field</div>
              <div>{{ backgroundData.main_academic_field }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Specialization</div>
              <div>{{ backgroundData.specialization }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Unique Skillset</div>
              <div>{{ backgroundData.unique_skillset }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Critical Discussions -->
      <div class="text-h6 q-mb-md">Critical Discussions</div>
      <div class="row q-col-gutter-md q-mb-lg">
        <div v-for="n in 3" :key="n" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Critical Discussion {{ n }}</div>
              <div>{{ backgroundData[`critical_discussion_${n}`] }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Key Issues -->
      <div class="text-h6 q-mb-md">Key Issues</div>
      <div class="row q-col-gutter-md q-mb-lg">
        <div v-for="n in 3" :key="n" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Key Issue {{ n }}</div>
              <div>{{ backgroundData[`key_issue_${n}`] }}</div>
              <template v-if="n > 1">
                <div class="q-mt-sm">
                  <div class="text-caption">Discussion Field 1</div>
                  <div>{{ backgroundData[`key_issue_${n}_discussion_field_1`] }}</div>
                </div>
                <div class="q-mt-sm">
                  <div class="text-caption">Discussion Field 2</div>
                  <div>{{ backgroundData[`key_issue_${n}_discussion_field_2`] }}</div>
                </div>
              </template>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Benefits to US -->
      <div class="text-h6 q-mb-md">Benefits to US</div>
      <div class="row q-col-gutter-md">
        <div v-for="n in 3" :key="n" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Benefit {{ n }}</div>
              <div>{{ backgroundData[`benefit_us_issue_${n}`] }}</div>
              <div class="q-mt-sm">
                <div class="text-caption">Discussion Field 1</div>
                <div>{{ backgroundData[`benefit_us_issue_${n}_discussion_field_1`] }}</div>
              </div>
              <div class="q-mt-sm">
                <div class="text-caption">Discussion Field 2</div>
                <div>{{ backgroundData[`benefit_us_issue_${n}_discussion_field_2`] }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <div v-else class="text-center text-grey q-pa-md">No background information available</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import ReviewSection from './ReviewSection.vue'

export default {
  name: 'BackgroundInfoTab',

  components: {
    ReviewSection,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    backgroundData: {
      type: Object,
      default: () => null,
    },
  },

  emits: ['status-updated'],

  setup(props, { emit }) {
    const route = useRoute()
    const $q = useQuasar()
    const submitting = ref(false)

    const getStatusColor = (status) => {
      switch (status) {
        case 'approved':
          return 'positive'
        case 'rejected':
          return 'negative'
        default:
          return 'warning'
      }
    }

    const handleReview = async (reviewData) => {
      submitting.value = true
      try {
        await api.post(
          `/api/auth/background-information/${route.params.id}/respond-review`,
          reviewData,
        )

        emit('status-updated', reviewData.response)

        $q.notify({
          type: 'positive',
          message: 'Review submitted successfully',
          position: 'top',
        })
      } catch (error) {
        console.error('Error submitting review:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to submit review',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    return {
      submitting,
      getStatusColor,
      handleReview,
    }
  },
}
</script>
