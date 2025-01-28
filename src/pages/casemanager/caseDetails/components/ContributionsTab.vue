<template>
  <div class="contributions">
    <review-section
      :current-status="contributionsData?.[0]?.status"
      :submitting="submitting"
      @submit-review="handleReview"
    />
    <div v-if="loading" class="row justify-center q-pa-md">
      <q-spinner color="primary" size="3em" />
    </div>

    <template v-else-if="contributionsData && contributionsData.length">
      <div
        v-for="(contribution, index) in contributionsData"
        :key="contribution.id"
        class="q-mb-lg"
      >
        <div class="text-h6 q-mb-md">Project {{ index + 1 }}</div>

        <!-- Project Details -->
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2">Title of Project</div>
                <div>{{ contribution.title_of_project }}</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2">Project Duration</div>
                <div>
                  {{ contribution.date_of_initiation_from }} to
                  {{ contribution.date_of_initiation_to }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Publications -->
        <div class="text-subtitle2 q-mb-sm">Resulting Publications</div>
        <div class="row q-col-gutter-md q-mb-md">
          <template v-for="n in 3" :key="`pub-${n}`">
            <div v-if="contribution[`resulting_publications_${n}`]" class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  {{ contribution[`resulting_publications_${n}`] }}
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>

        <!-- Funding Sources -->
        <div class="text-subtitle2 q-mb-sm">Funding Sources</div>
        <div class="row q-col-gutter-md q-mb-md">
          <template v-for="n in 3" :key="`fund-${n}`">
            <div v-if="contribution[`funding_sources_${n}`]" class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  {{ contribution[`funding_sources_${n}`] }}
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>

        <!-- Summary and Description -->
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2">Summary of Work</div>
                <div>{{ contribution.summary_of_work }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2">NIW Project Description</div>
                <div>{{ contribution.niw_project_description }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Citations -->
        <div class="text-subtitle2 q-mb-sm">Citations</div>
        <div class="row q-col-gutter-md">
          <template v-for="n in 4" :key="`cite-${n}`">
            <div v-if="contribution[`citation_${n}`]" class="col-12 col-md-3">
              <q-card flat bordered>
                <q-card-section>
                  {{ contribution[`citation_${n}`] }}
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>

        <q-separator class="q-my-lg" />
      </div>
    </template>

    <div v-else class="text-center text-grey q-pa-md">No contributions available</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import ReviewSection from './ReviewSection.vue'

export default {
  name: 'ContributionsTab',

  components: {
    ReviewSection,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    contributionsData: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const route = useRoute()
    const $q = useQuasar()
    const submitting = ref(false)

    const getStatusColor = (status) => {
      switch (status) {
        case 'approved':
          return 'positive'
        case 'pending':
          return 'warning'
        case 'review':
          return 'info'
        default:
          return 'grey'
      }
    }

    const handleReview = async (reviewData) => {
      submitting.value = true
      try {
        await api.post(`/api/auth/case/contributions/${route.params.id}/respond-review`, reviewData)

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
