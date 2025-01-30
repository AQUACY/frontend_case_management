<template>
  <div class="qualifications">
    <review-section
      :current-status="qualificationsData?.status"
      :submitting="submitting"
      @submit-review="handleReview"
    />

    <div v-if="qualificationsData?.status" class="q-mb-md">
      <q-chip
        :color="getStatusColor(qualificationsData.status)"
        text-color="white"
        class="text-weight-medium"
      >
        Status: {{ qualificationsData.status }}
      </q-chip>
    </div>

    <div v-if="loading" class="row justify-center q-pa-md">
      <q-spinner color="green" size="3em" />
    </div>

    <template v-else-if="qualificationsData">
      <!-- Awards Section -->
      <div v-if="qualificationsData.nationally_internationally_recognized_awards" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Awards</div>
        <div v-for="n in 3" :key="`award-${n}`" class="q-mb-md">
          <q-card v-if="qualificationsData[`award_${n}_name`]" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">{{ qualificationsData[`award_${n}_name`] }}</div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-12 col-md-4">
                  <div class="text-caption">Recipient</div>
                  <div>{{ qualificationsData[`award_${n}_recipient`] }}</div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-caption">Institution</div>
                  <div>{{ qualificationsData[`award_${n}_institution`] }}</div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-caption">Competitors/Winners</div>
                  <div>{{ qualificationsData[`number_of_competitors_winners_${n}`] }}</div>
                </div>
                <div class="col-12">
                  <div class="text-caption">Eligibility</div>
                  <div>{{ qualificationsData[`who_is_eligible_to_compete_${n}`] }}</div>
                </div>
                <div class="col-12">
                  <div class="text-caption">Selection Criteria</div>
                  <div>{{ qualificationsData[`selection_criteria_${n}`] }}</div>
                </div>
                <div class="col-12">
                  <div class="text-caption">Judges</div>
                  <div>{{ qualificationsData[`who_are_judges_${n}`] }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Peer Review Section -->
      <div v-if="qualificationsData.peer_review" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Peer Review Experience</div>
        <q-card flat bordered>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption">Organization Reviewed</div>
                <div>{{ qualificationsData.name_of_organization_reviewed }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption">Number of Reviews Completed</div>
                <div>{{ qualificationsData.number_of_reviews_completed }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Leadership Roles Section -->
      <div v-if="qualificationsData.leadership_roles" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Leadership Roles</div>
        <q-card flat bordered>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <div class="text-caption">Role</div>
                <div>{{ qualificationsData.name_of_leadership_roles }}</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-caption">Organization</div>
                <div>{{ qualificationsData.name_of_organization_in_leadership }}</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-caption">Date of Service</div>
                <div>{{ qualificationsData.date_of_service }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Organization Reputation</div>
                <div>{{ qualificationsData.summary_of_organization_reputation }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Role and Responsibilities</div>
                <div>{{ qualificationsData.summary_of_role_and_responsibilities }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Memberships Section -->
      <div v-if="qualificationsData.notable_memberships" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Notable Memberships</div>
        <q-card flat bordered>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption">Organization</div>
                <div>{{ qualificationsData.name_of_organization_in_membership }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption">Level of Membership</div>
                <div>{{ qualificationsData.level_of_membership }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Requirements</div>
                <div>{{ qualificationsData.requirements_for_membership }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Eligibility Judges</div>
                <div>{{ qualificationsData.who_judges_membership_eligibility }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Media Coverage Section -->
      <div v-if="qualificationsData.notable_media_coverage" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Notable Media Coverage</div>
        <q-card flat bordered>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption">Article Title</div>
                <div>{{ qualificationsData.title_of_article }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption">Publication Date</div>
                <div>{{ qualificationsData.date_published }}</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-caption">Author</div>
                <div>{{ qualificationsData.author }}</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-caption">Publication</div>
                <div>{{ qualificationsData.magazine_newspaper_website }}</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-caption">Circulation</div>
                <div>{{ qualificationsData.circulation }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Article Focus</div>
                <div>{{ qualificationsData.summary_of_article_focus }}</div>
              </div>
              <div class="col-12">
                <div class="text-caption">Relevance to Work</div>
                <div>{{ qualificationsData.relevance_to_original_work }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Invitations Section -->
      <div v-if="qualificationsData.invitations" class="q-mb-lg">
        <div class="text-h6 q-mb-md">Conference Invitations</div>
        <div v-for="n in 3" :key="`conf-${n}`">
          <q-card v-if="qualificationsData[`conference_title_${n}`]" flat bordered class="q-mb-md">
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <div class="text-caption">Conference Title</div>
                  <div>{{ qualificationsData[`conference_title_${n}`] }}</div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="text-caption">Date</div>
                  <div>{{ qualificationsData[`conference_month_year_${n}`] }}</div>
                </div>
                <div class="col-12">
                  <div class="text-caption">Invitation Details</div>
                  <div>{{ qualificationsData[`details_of_invitation_${n}`] }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <div v-else class="text-center text-grey q-pa-md">No additional qualifications available</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import ReviewSection from './ReviewSection.vue'

export default {
  name: 'QualificationsTab',

  components: {
    ReviewSection,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    qualificationsData: {
      type: Object,
      default: () => null,
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
        await api.post(
          `/api/auth/additional-qualification/${route.params.id}/respond-review`,
          reviewData,
        )

        // if (props.qualificationsData) {
        //   props.qualificationsData.status = response.data.status
        // }

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
