<template>
  <div class="questionnaire-section q-pa-md">
    <q-card flat bordered>
      <!-- Review Status Section -->
      <q-card-section v-if="!loading && !error" class="review-section q-mb-md">
        <div class="row items-center justify-between">
          <div class="col-12 col-md-auto q-mb-sm-md">
            <q-chip :color="getStatusColor" text-color="white" class="text-weight-medium">
              Status: {{ questionnaireData.status || 'Pending Review' }}
            </q-chip>
          </div>
          <div class="col-12 col-md-auto">
            <div class="row items-center q-gutter-md">
              <q-select
                v-model="reviewDecision"
                :options="reviewOptions"
                label="Review Decision"
                outlined
                dense
                color="green"
                class="col-grow"
                style="min-width: 200px"
              />
              <q-btn
                :loading="submitting"
                :disable="!reviewDecision"
                color="green"
                label="Submit Review"
                @click="submitReview"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="green" size="3em" />
        <div class="text-grey q-mt-md">Loading questionnaire data...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="green" label="Retry" @click="fetchQuestionnaireData" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <!-- Basic Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Basic Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.petition_type"
                label="Petition Type"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.petitioner"
                label="Petitioner"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Personal Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.family_name"
                label="Family Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.given_name"
                label="Given Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.full_middle_name"
                label="Full Middle Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.native_alphabet"
                label="Name in Native Alphabet"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.dob"
                label="Date of Birth"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.city_town_village_of_birth"
                label="City/Town/Village of Birth"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.state_of_birth"
                label="State of Birth"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.country_of_birth"
                label="Country of Birth"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.nationality"
                label="Nationality"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.alien_registration_number"
                label="Alien Registration Number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.ssn"
                label="SSN"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Address Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.street_number_name"
                label="Street Number and Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.type"
                label="Address Type"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.type_detail"
                label="Type Detail"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.city_town"
                label="City"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.state"
                label="State"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="questionnaireData.zip_code"
                label="ZIP Code"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.province"
                label="Province"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.country"
                label="Country"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Passport Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Passport Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.passport_number"
                label="Passport Number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.passport_expiration_date"
                label="Passport Expiration Date"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.passport_country"
                label="Passport Country"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.arrival_date"
                label="Arrival Date"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.admission_record_number"
                label="Admission Record Number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.admission_class"
                label="Admission Class"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.admit_until_date"
                label="Admit Until Date"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Occupation Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Occupation Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.occupation"
                label="Occupation"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.annual_income"
                label="Annual Income"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.job_title"
                label="Job Title"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.soc_code"
                label="SOC Code"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.nontechnical_job_description"
                label="Non-Technical Job Description"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.full_time_position"
                label="Full Time Position"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.hours_per_week"
                label="Hours Per Week"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.permanent_position"
                label="Permanent Position"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.new_position"
                label="New Position"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.wages"
                label="Wages"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.wages_per"
                label="Wages Per"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.worksite_type"
                label="Worksite Type"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.worksite_street_number_name"
                label="Worksite Street Address"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_building_type"
                label="Work Building Type"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_type_detail"
                label="Work Type Detail"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_city_town"
                label="Work City"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_state"
                label="Work State"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_county_township"
                label="Work County/Township"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.work_zip_code"
                label="Work ZIP Code"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>
        <!-- Processing Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Processing Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.apply_visa_abroad"
                label="Apply Visa Abroad"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.processing_country"
                label="Processing Country"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.processing_city"
                label="Processing City"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.file_adjustment_status"
                label="File Adjustment Status"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.current_residence_country"
                label="Current Residence Country"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>
        <!-- Foreign Address -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Foreign Address</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.foreign_address_street_number_name"
                label="Street Address"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.foreign_address_type"
                label="Type"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.foreign_type_detail"
                label="Type Details"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.foreign_city_town"
                label="City/Town"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.foreign_state_province"
                label="State/Province"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.foreign_postal_code"
                label="Postal Code"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="questionnaireData.foreign_country"
                label="Country"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md text-green">Additional Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.daytime_telephone"
                label="Daytime Telephone"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.mobile_telephone"
                label="Mobile Telephone"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="questionnaireData.email_address"
                label="Email Address"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>
        <!-- Family Members -->
        <div class="section-container">
          <div class="text-h6 q-mb-md text-green">Family Members</div>
          <div v-for="member in questionnaireData.family_members" :key="member.id" class="q-mb-lg">
            <q-card bordered flat class="q-pa-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-3">
                  <q-input
                    readonly
                    v-model="member.family_name"
                    label="Family Name"
                    outlined
                    dense
                    stack-label
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    readonly
                    v-model="member.given_name"
                    label="Given Name"
                    outlined
                    dense
                    stack-label
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    readonly
                    v-model="member.relationship"
                    label="Relationship"
                    outlined
                    dense
                    stack-label
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    readonly
                    v-model="member.dob"
                    label="Date of Birth"
                    outlined
                    dense
                    stack-label
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    readonly
                    v-model="member.birth_country"
                    label="Birth Country"
                    outlined
                    dense
                    stack-label
                  />
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'QuestionnaireSection',

  props: {
    caseId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar()
    const loading = ref(false)
    const error = ref(null)
    const questionnaireData = ref({})
    const reviewDecision = ref(null)
    const submitting = ref(false)

    const reviewOptions = [
      { label: 'Approve', value: 'approved' },
      { label: 'Reject', value: 'pending' },
    ]

    const getStatusColor = computed(() => {
      const status = questionnaireData.value.status?.toLowerCase()
      switch (status) {
        case 'approved':
          return 'positive'
        case 'pending':
          return 'negative'
        default:
          return 'warning'
      }
    })

    const submitReview = async () => {
      if (!reviewDecision.value) return

      submitting.value = true
      try {
        await api.post(`/api/auth/cases/${props.caseId}/questionnaire/respond`, {
          response: reviewDecision.value.value,
        })

        questionnaireData.value.review_status = reviewDecision.value
        $q.notify({
          type: 'positive',
          message: 'Review submitted successfully',
          position: 'top',
        })
        fetchQuestionnaireData()
      } catch (err) {
        console.error(err)
        $q.notify({
          type: 'negative',
          message: 'Failed to submit review',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    const fetchQuestionnaireData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/auth/cases/questionnaire/${props.caseId}`)
        questionnaireData.value = response.data.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading questionnaire data. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load questionnaire data',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchQuestionnaireData()
      }
    })

    return {
      loading,
      error,
      questionnaireData,
      fetchQuestionnaireData,
      reviewDecision,
      reviewOptions,
      submitting,
      submitReview,
      getStatusColor,
    }
  },
}
</script>

<style lang="scss" scoped>
.questionnaire-section {
  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  :deep(.q-field--readonly) {
    .q-field__native {
      color: $grey-8;
    }

    .q-field__label {
      color: $grey-7;
    }
  }

  .text-h6 {
    color: $primary;
    font-weight: 500;
  }

  .review-section {
    border-bottom: 1px solid $grey-4;
  }
}
</style>
