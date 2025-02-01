<template>
  <q-page class="q-pa-md">
    <div class="endavor-container">
      <!-- Header -->
      <div class="text-h5 q-mb-md">Proposed Employment/Proposed Endeavor</div>

      <div class="text-caption q-mb-lg">
        Saved at {{ currentDateTime }} by client.
        <br />
        Your progress can be saved at any time by clicking "Save" at the bottom of the form.
      </div>

      <!-- Status Section -->
      <div class="status-section q-mt-md">
        <q-banner class="bg-grey-2">
          <template v-slot:avatar>
            <q-icon :name="getStatusIcon" :color="getStatusColor" />
          </template>
          <div class="row items-center justify-between">
            <div>
              <div class="text-subtitle1">Current Status: {{ formData.status }}</div>
              <div class="text-caption">
                {{ getStatusMessage }}
              </div>
            </div>
            <q-btn
              v-if="formData.status === 'pending'"
              color="green"
              label="Request Review"
              :loading="requestingReview"
              @click="handleRequestReview"
            />
          </div>
        </q-banner>
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <!-- Status Display -->
        <div class="row items-center q-mb-md">
          <div class="col">
            <q-checkbox
              v-model="formData.selection"
              label="I am not filing NIW"
              true-value="yes"
              false-value="no"
            />
          </div>
          <div class="col text-right">
            <q-badge
              :color="formData.status === 'pending' ? 'warning' : 'positive'"
              class="cursor-pointer"
              @click="requestReview"
            >
              Status: {{ formData.status.charAt(0).toUpperCase() + formData.status.slice(1) }}
            </q-badge>
          </div>
        </div>

        <!-- A) Proposed Endeavor Section -->
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">A) Proposed Endeavor</div>
            <div class="text-body2 q-mb-md">
              <p>
                One of the most important parts of a successful NIW petition is clearly describing
                the petitioner's "proposed endeavor." To ensure that you are able to define your
                proposed endeavor as accurately as possible, please review the document "Proposed
                Endeavor Guide and Clarifications.pdf" found here before completing this section.
                Once you have reviewed this document, please complete the prompts below, which will
                help guide you in preparing your roughly 3- to 4-sentence proposed endeavor.
              </p>
              <p>
                <span class="text-bold">DEFINITION</span> | Your proposed endeavor should be the
                area of research you intend to pursue once you receive your green card and
                throughout your career. If you plan to conduct research in a field that is
                significantly different from your current field (for example, switching from physics
                to finance), please contact us so we can discuss how to approach your case.
              </p>
              <p>
                <b>LEGAL CONSIDERATIONS |</b> Please ensure that your proposed employment aligns
                with your proposed endeavor throughout your green card application process (I-140,
                I-485/Immigrant Visa Processing).
              </p>
              <p>
                <b>REMINDER |</b> Please note that your proposed endeavor should focus on your
                planned research, not your proposed employment. Please do not discuss your proposed
                employment or previous employment in this section but instead describe the specific
                research topic you plan to pursue.
              </p>
              <p>
                For examples and samples of the proposed endeavor statement, please refer to the
                "NIW CASES ONLY PES-EL Samples_11.29.23" folder here.
              </p>
              <p>
                <b>PROPOSED ENDEAVOR</b> | Your proposed endeavor itself should be no more than one
                sentence long and should be made up of three distinct parts, outlined below.
              </p>
              <p>
                <b>Part One:</b>
                <span class="text-red-5"
                  >The active verb(s) describing your methodical approach</span
                >.
              </p>
              <p>
                <b>Part Two:</b>
                <span class="text-yellow-8">The main topic/specific subject of your research.</span>
              </p>
              <p>
                <b>Part Three:</b>
                <span class="text-green-10"
                  >The impact of your proposed research on the field and/or its real-world
                  applications.</span
                >
              </p>
              <p>
                Together, the three parts of the proposed endeavor combine to make one complete
                sentence that encompasses your research plans, as shown in the example below: "My
                proposed endeavor is to [ develop state-of-the-art material characterization
                approaches ] [ for identifying materials that are ideal for use ] [ in a range of
                biomedical applications, including as artificial heart valves, joints, and organs ]"
              </p>
              <p>Please complete the following three boxes to make one sentence:</p>
              <p>My proposed endeavor is to</p>
            </div>

            <!-- Proposed Endeavor Fields -->
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_1"
                  label="Part One: The active verb(s) describing your methodical approach"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="red-5"
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_2"
                  label="Part Two: The main topic/specific subject of your research"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="yellow-8"
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_3"
                  label="Part Three: The impact of your proposed research on the field and/or its real-world applications"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="green-10"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- Past Experience Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">B) Past Experience</div>

            <div class="text-body2 q-mb-md">
              Your proposed endeavor statement should also include a brief summary of the relevant
              skills and past research experience that will help you to advance your endeavor. This
              should also be no more than one sentence long.
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.past_experience"
                  label="Past Experience Statement"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  hint="Example: To progress this endeavor, I will utilize my extensive experience in advanced microscopy techniques, chemical composition, crystal structure, and physiography."
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Publication Plans Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">C) Publication Plans</div>

            <div class="text-body2 q-mb-md">
              Please provide us with a brief list of the plans of publications you plan to produce
              in order to disseminate your work on your proposed endeavors.
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.publication_plans"
                  label="Publication Plans Statement"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  hint="Example: My work will continue to be circulated in the best through my past research publications (3 planned)."
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Dynamic Employment Status Section based on selected petition types -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">D) Employment Status</div>

            <div class="text-body2 q-mb-md">
              If there are any changes to your proposed employment during your case preparation,
              please let us know this up-front and send us a message letting us know what plans have
              changed. This will help us to ensure that your employment numbers make up-to-date and
              avoid delays in the preparation of your documents.
            </div>

            <div class="text-body2 q-mb-md">
              The phrase "proposed employment" refers to the job that you intend to hold after
              receiving your green card. In general, although it is difficult to predict what you
              will obtain once after if they are currently employed in the U.S. and you do not have
              any plans to change jobs after a green card, your current employment will serve as
              your "proposed employment" for this purpose.
            </div>

            <div class="text-body2 q-mb-md">
              Please note that the proposed employment that you list in your employment numbers
              should reflect positions that you would generally intend to accept should you be able
              to make to stay.
            </div>

            <div class="text-body2 q-mb-md">
              If you have any questions or aren't certain which option best fits your employment
              situation, please send us a message.
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-mb-lg">
              <q-select
                v-model="formData.type"
                :options="petitionTypes"
                label="Select Petition Type(s)"
                multiple
                outlined
                emit-value
                map-options
                @update:model-value="handlePetitionTypeChange"
              />
            </div>
          </q-card-section>
        </q-card>
        <template v-for="type in formData.type" :key="type">
          <q-card flat bordered class="q-mb-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md">Employment Status for {{ type }}</div>

              <div class="row q-col-gutter-md">
                <template
                  v-for="(value, key) in getEmploymentFields(type.toLowerCase())"
                  :key="key"
                >
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="formData[key]"
                      :label="formatFieldLabel(key)"
                      :options="['yes', 'no']"
                      outlined
                    />
                  </div>
                </template>
              </div>
            </q-card-section>
          </q-card>
        </template>

        <!-- Save Button -->
        <div class="row justify-end q-mt-lg">
          <q-btn color="green-10" label="Save" type="submit" :loading="saving" />
        </div>
      </q-form>
    </div>

    <!-- Confirmation Dialog -->
    <q-dialog v-model="showConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="green" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to request a review?</span>
        </q-card-section>

        <q-card-section class="text-caption">
          This action will submit your record for review. Make sure all information is complete and
          accurate.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn
            flat
            label="Request Review"
            color="green"
            @click="confirmRequestReview"
            :loading="requestingReview"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useEndavorRecordsStore } from 'src/stores/endavorRecords'
import { date } from 'quasar'

export default {
  name: 'ProposedEndavorRecord',

  setup() {
    const $q = useQuasar()
    const store = useEndavorRecordsStore()
    const saving = ref(false)

    const petitionTypes = [
      { label: 'NIW', value: 'NIW' },
      { label: 'EB1A', value: 'EB1A' },
      { label: 'EB1B', value: 'EB1B' },
      { label: 'O1', value: 'O1' },
    ]

    const formData = ref({
      type: [],
      selection: 'no',
      proposed_endavor_field_1: '',
      proposed_endavor_field_2: '',
      proposed_endavor_field_3: '',
      past_experience: '',
      publication_plans: '',
      status: 'pending',
    })

    const currentDateTime = computed(() => {
      return date.formatDate(new Date(), 'MM/DD/YYYY h:mm a')
    })

    const requestingReview = ref(false)
    const showConfirmDialog = ref(false)

    const getStatusIcon = computed(() => {
      switch (formData.value.status) {
        case 'pending':
          return 'pending'
        case 'under_review':
          return 'review'
        case 'approved':
          return 'check_circle'
        case 'rejected':
          return 'cancel'
        default:
          return 'help_outline'
      }
    })

    const getStatusColor = computed(() => {
      switch (formData.value.status) {
        case 'pending':
          return 'grey'
        case 'under_review':
          return 'orange'
        case 'approved':
          return 'positive'
        case 'rejected':
          return 'negative'
        default:
          return 'grey'
      }
    })

    const getStatusMessage = computed(() => {
      switch (formData.value.status) {
        case 'pending':
          return 'Your record is pending review. Click "Request Review" when ready.'
        case 'under_review':
          return 'Your record is currently being reviewed.'
        case 'approved':
          return 'Your record has been approved.'
        case 'rejected':
          return 'Your record needs revision.'
        default:
          return 'Status unknown'
      }
    })

    const getEmploymentFields = (type) => {
      const fields = {}
      const baseFields = [
        'currently_student_us',
        'currently_employed_academic',
        'currently_employed_postdoctoral',
        'received_promotion_notice',
        'not_promoted_notice',
        'currently_medical_resident',
        'currently_visiting_scholar',
        'currently_employed_us_business',
        'currently_employed_outside_us',
        'currently_unemployed',
        'currently_student_outside_us',
        'currently_intern_part_time',
        'currently_employed_visa_expiring',
        'currently_intern_student',
        'currently_unemployed_with_offer',
        'other',
      ]

      baseFields.forEach((field) => {
        const key = `${field}_${type}`
        fields[key] = formData.value[key] || 'no'
      })

      return fields
    }

    const formatFieldLabel = (key) => {
      return key
        .replace(/_/g, ' ')
        .replace(/niw|eb1a|eb1b|o1/i, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const handlePetitionTypeChange = (newTypes) => {
      formData.value.type = newTypes
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        await store.saveEndavorRecord(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Record saved successfully',
        })
      } catch (error) {
        console.error('Save error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save record',
        })
      } finally {
        saving.value = false
      }
    }

    const handleRequestReview = () => {
      showConfirmDialog.value = true
    }

    const confirmRequestReview = async () => {
      try {
        requestingReview.value = true
        await store.requestReview()
        showConfirmDialog.value = false

        // Refresh the record data
        const record = await store.fetchEndavorRecord()
        if (record) {
          formData.value = { ...formData.value, ...record }
        }

        $q.notify({
          type: 'positive',
          message: 'Review request submitted successfully',
        })
      } catch (error) {
        console.error('Request review error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to submit review request',
        })
      } finally {
        requestingReview.value = false
      }
    }

    onMounted(async () => {
      try {
        const record = await store.fetchEndavorRecord()
        if (record) {
          formData.value = { ...formData.value, ...record }
        }
      } catch (error) {
        console.error('Error loading record:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load record',
        })
      }
    })

    return {
      formData,
      saving,
      currentDateTime,
      petitionTypes,
      getEmploymentFields,
      formatFieldLabel,
      handlePetitionTypeChange,
      onSubmit,
      requestingReview,
      showConfirmDialog,
      getStatusIcon,
      getStatusColor,
      getStatusMessage,
      handleRequestReview,
      confirmRequestReview,
    }
  },
}
</script>

<style scoped>
.endavor-container {
  max-width: 1200px;
  margin: 0 auto;
}

.status-section {
  border-radius: 4px;
  overflow: hidden;
}
</style>
