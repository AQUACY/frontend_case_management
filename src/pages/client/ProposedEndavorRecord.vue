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
            <!-- <q-checkbox
              v-model="formData.selection"
              label="I am not filing NIW"
              true-value="yes"
              false-value="no"
            /> -->
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
            <div class="text-subtitle1 q-mb-md text-bold">A) Proposed Endeavor</div>
            <div class="text-body2 q-mb-md">
<p>The Proposed Endeavor is the cornerstone of your petition, as it demonstrates
how your future research aligns with U.S. national interests and meets USCIS criteria
for substantial merit and national importance. A well-crafted statement not only defines
your research vision but also establishes its broader societal or technological impact.</p>

<span class="text-bold"> Guidance for Drafting</span><br /><br />
<span class="text-bold">1. Definition:</span> <br />

<p>Your Proposed Endeavor must describe the specific research area you will
pursue after obtaining permanent residency and throughout your career. This is
distinct from your current work unless continuity is explicitly justified.</p>
 <ul> <li><b>Field Transitions:</b> If shifting focus (e.g., from aerospace engineering to AI-
driven climate modeling), explain how your expertise transfers. Contact us to
discuss framing strategies.</li></ul>

<span class="text-bold"> 2. Legal Compliance:</span> <br /> <br />
<ul><li><span class="text-bold">Employment Alignment:</span> 
Your job role during green card processing (I-140,
I-485) must directly support your Proposed Endeavor. For example:
<ul><li><i>If your endeavor involves cancer immunotherapy research, your
employment should involve roles in biomedical R&amp;D, not unrelated
fields like software sales.</i></li></ul></li></ul>

<ul><li><span class="text-bold">USCIS Scrutiny:</span> Inconsistent statements may trigger Requests for Evidence
(RFEs) or denials.</li></ul>

<span class="text-bold">3. Focus on Research, Not Employment:</span>
<p>Avoid mentioning job titles, employers, or past roles. Instead, concentrate on
your scientific goals, methodology, and societal value.</p> <br />

<b class="q-ml-md"> Incorrect: </b> <br />
<i class="q-ml-md">“I will work as a senior data scientist at XYZ Corp to develop AI tools.”</i><br />
<b class="q-ml-md"> Correct:</b> <br /> 
<i class="q-ml-md">“My research will focus on advancing explainable AI algorithms to improve
transparency in healthcare diagnostics.”</i> <br /> <br />

<span class="text-bold">Structure of the Proposed Endeavor Statement</span>

<p>Condense your vision into one sentence with three interconnected components:</p>

<span class="text-bold">1. Approach:</span>
<p>Use action verbs to describe your technical or analytical methods.</p>
<ul> <li>Examples: design, synthesize, model, optimize, innovate, characterize,
integrate.</li>
<li>Avoid passive voice (e.g., “will be developed” → “develop”).</li></ul>

<span class="text-bold">2. Subject:</span>
<p>Specify the scientific challenge, technology, or domain you aim to address.</p>
<ul><li>Examples: carbon capture materials, quantum computing architectures, AI-
driven agricultural optimization.</li></ul>

<span class="text-bold">3. Impact:</span>
<p>Highlight how your work benefits the U.S. national interest. Link to federal
priorities like:</p>
<ul><li>Sustainability (e.g., clean energy, climate resilience).</li>
<li>Public health (e.g., disease treatment, healthcare accessibility).</li>
<li>Technological leadership (e.g., semiconductor innovation, cybersecurity).</li>
</ul>

<span class="text-bold">Example:</span>
“My Proposed Endeavor is to [<span class="text-red">design machine learning frameworks</span>] [<span class="text-red">to predict protein-
protein interactions</span>] [<span class="text-red">to accelerate drug discovery for antibiotic-resistant infections,
aligning with U.S. public health initiatives</span>].”
            </div>
            <!-- <div class="text-body2 q-mb-md">
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
            </div> -->

            <!-- Proposed Endeavor Fields -->
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_1"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="red-5"
                />
              </div>
              <!-- <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_2"
                  label="Part Two: The main topic/specific subject of your research"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="yellow-8"
                />
              </div> -->
              <!-- <div class="col-12">
                <q-input
                  v-model="formData.proposed_endavor_field_3"
                  label="Part Three: The impact of your proposed research on the field and/or its real-world applications"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                  color="green-10"
                />
              </div> -->
            </div>
          </q-card-section>
        </q-card>
        <!-- Past Experience Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md text-bold">B) Relevant Expertise</div>

            <div class="text-body2 q-mb-md">
              In one sentence, connect your past research experience and technical skills to your
              Proposed Endeavor. Highlight expertise that directly supports your ability to execute the
              work.
              <span class="text-bold">Example :</span>
              <ul>
                <li><i>
                  “My background in CRISPR-Cas9 gene editing and bioinformatics analysis
                  positions me to advance precision medicine research.”
                </i></li>
                <li><i>
                  “My experience in synthesizing nanomaterials for energy storage systems equips
                  me to innovate next-generation battery technologies.”
                </i></li>
              </ul>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.past_experience"
                  
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                 
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Publication Plans Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md text-bold">C) Dissemination Strategy</div>

            <div class="text-body2 q-mb-md">
              Outline how you will share your findings to amplify impact. Include specific, actionable
              plans such as:
              <ul>
                <li><i>
                
                <li><i>
                  Peer-reviewed publications (e.g., “Three articles in journals like Nature Energy or
                  ACS Nano”).
                </i></li>
                <li><i>
                  Conference presentations (e.g., “Presentations at IEEE, AGU, or Gordon
                  Research Conferences”).
                </i></li>
            
                </i></li>
                <li><i>
                  Patents or industry collaborations (e.g., “Filing patents for scalable carbon
                  capture technologies”).
                </i></li>
                <li><i>
                  Public outreach (e.g., “Developing open-access datasets or policy white papers”).
                </i></li>
              </ul>

              <span class="text-bold">Example :</span> <br /> <br />
              <p>“I plan to publish findings in high-impact journals, present at international AI ethics
                conferences, and collaborate with policymakers to draft guidelines for responsible AI
                deployment.”
              </p>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  v-model="formData.publication_plans"
                 
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'This field is required']"
                 
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Dynamic Employment Status Section based on selected petition types -->
        <!-- <q-card flat bordered class="q-mb-md">
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
        </q-card> -->
        <!-- <template v-for="type in formData.type" :key="type">
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
        </template> -->

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
