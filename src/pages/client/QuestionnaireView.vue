<template>
  <q-page class="q-pa-md">
    <div class="questionnaire-container">
      <!-- Loading State -->
      <div v-if="loading" class="full-width row justify-center items-center" style="height: 400px">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-else>
        <!-- Header Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6">I-140 Questionnaire</div>
            <div class="text-caption text-grey">
              Please fill out all required information. Your answers will be used for your petition.
            </div>
          </q-card-section>
        </q-card>

        <!-- Form Sections -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">Instructions</div>
            <q-card flat bordered class="q-pa-md bg-grey-1">
              <div class="text-body1 q-mb-md">
                Please click the button "Request to Review" when you would like us to review the
                questionnaire. Thank you.
              </div>

              <div class="text-body2 q-mb-md">
                <p>Important Notes:</p>
                <ul class="q-mb-md">
                  <li>
                    The information you provide in this tab will be used to generate the USCIS Form
                    I-140 and Form G-28 (if applicable) for your I-140 case. Therefore, please
                    complete all fields with accurate and up-to-date information.
                  </li>
                  <li>
                    Your progress can be saved at any time by clicking "Save Questionnaire" at the
                    bottom of the form. We suggest saving your progress at least once every 30
                    minutes.
                  </li>
                  <li>
                    Please review all information carefully before submitting. If you need to make
                    changes after submission, please still save as a draft and reference a
                    document/form to specialize in addition to pressing the request review button.
                  </li>
                </ul>
              </div>

              <div class="text-body2">
                <p>
                  Note: When you click the review button, our I-140 specialist team will review your
                  questionnaire first, and then we will prepare the strongest petition and/or and
                  evidence of your current visa status in the "Identity Documents and Forms" section
                  of your matters page. After this, we'll make the next steps of the Questionnaire
                  tab available to you.
                </p>
                <p class="text-weight-medium text-negative">
                  Please do not submit the tab to USCIS. Once you have received the forms from us,
                  DO NOT edit or file tab further unless instructed. Please click directly on the
                  forms to edit them.
                </p>
              </div>
            </q-card>
          </q-card-section>

          <!-- Form Sections -->
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Petition Type</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <q-radio
                      v-model="formData.petition_type"
                      val="alien_extraordinary"
                      label="Alien with Extraordinary Ability (EB-1A)"
                      class="q-mb-sm"
                    />
                    <q-radio
                      v-model="formData.petition_type"
                      val="outstanding_professor"
                      label="Outstanding Professor or Researcher (EB-1B)"
                      class="q-mb-sm"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>
            <!-- Personal Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Personal Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.family_name"
                      label="Family Name (Last Name)"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.given_name"
                      label="Given Name (First Name)"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.full_middle_name"
                      label="Full Middle Name (if any)"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.native_alphabet"
                      label="Name in Native Alphabet (if applicable)"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Current Address -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Current Address</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.street_number_name"
                      label="Street Number and Name"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="formData.type"
                      :options="['Apt', 'Ste', 'Flr']"
                      label="Type"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.type_detail"
                      label="Number/Letter"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.city_town"
                      label="City or Town"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.state"
                      label="State"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.zip_code"
                      label="ZIP Code"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.province"
                      label="Province (if applicable)"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.country"
                      label="Country"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Birth Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Birth Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.dob"
                      label="Date of Birth"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.birth_city_town_village"
                      label="City/Town/Village of Birth"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.birth_state_province"
                      label="State/Province of Birth"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.birth_country"
                      label="Country of Birth"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>
            <!-- Contact Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Contact Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.phone_number"
                      label="Phone Number"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.email"
                      label="Email Address"
                      type="email"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Immigration Status -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Immigration Status</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.alien_number"
                      label="Alien Registration Number (A-Number)"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.current_visa_status"
                      label="Current Visa Status"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.visa_expiration"
                      label="Visa Expiration Date"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.passport_number"
                      label="Passport Number"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.passport_expiration"
                      label="Passport Expiration Date"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Employment Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Employment Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.current_employer"
                      label="Current Employer"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.job_title"
                      label="Current Job Title"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.employment_start_date"
                      label="Employment Start Date"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="formData.job_duties"
                      label="Brief Description of Job Duties"
                      type="textarea"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Education Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Education Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.highest_education"
                      label="Highest Level of Education"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.field_of_study"
                      label="Field of Study"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.institution_name"
                      label="Institution Name"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.graduation_date"
                      label="Graduation Date"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Family Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Family Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="formData.marital_status"
                      :options="['Single', 'Married', 'Divorced', 'Widowed']"
                      label="Marital Status"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.spouse_name"
                      label="Spouse's Full Name (if applicable)"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.number_of_children"
                      label="Number of Children"
                      type="number"
                      :rules="[val => val >= 0 || 'Must be 0 or greater']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>
            <!-- Immigration Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Immigration Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.alien_registration_number"
                      label="Alien Registration Number (A-Number)"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.arrival_date"
                      label="Date of Last Arrival in U.S."
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.admission_record_number"
                      label="I-94 Arrival-Departure Record Number"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.passport_number"
                      label="Current Passport Number"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.passport_expiration_date"
                      label="Passport Expiration Date"
                      type="date"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.admission_class"
                      label="Current Nonimmigrant Status"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Work Location Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Work Location Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <q-input
                      v-model="formData.worksite_street_number_name"
                      label="Street Address"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.work_city_town"
                      label="City/Town"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.work_state"
                      label="State"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.work_zip_code"
                      label="ZIP Code"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.work_county_township"
                      label="County"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Contact Information -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Contact Information</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.daytime_telephone"
                      label="Daytime Phone Number"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="formData.mobile_telephone"
                      label="Mobile Phone Number"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="formData.email_address"
                      label="Email Address"
                      type="email"
                      :rules="[
                        val => !!val || 'Field is required',
                        val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
                      ]"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Additional Questions -->
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Additional Questions</div>
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <q-select
                      v-model="formData.apply_visa_abroad"
                      :options="['Yes', 'No']"
                      label="Will you apply for adjustment of status in the U.S.?"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12">
                    <q-select
                      v-model="formData.simultaneous_petitions"
                      :options="['Yes', 'No']"
                      label="Are there any other I-140 petitions being filed simultaneously?"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12" v-if="formData.simultaneous_petitions === 'Yes'">
                    <q-input
                      v-model="formData.simultaneous_petitions_details"
                      label="Please provide details"
                      type="textarea"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12">
                    <q-select
                      v-model="formData.removal_proceedings"
                      :options="['Yes', 'No']"
                      label="Are you currently in removal proceedings?"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-12" v-if="formData.removal_proceedings === 'Yes'">
                    <q-input
                      v-model="formData.removal_proceedings_details"
                      label="Please provide details"
                      type="textarea"
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <!-- Additional form sections would go here -->

            <q-card-section>
              <div class="row justify-end q-mt-md">
                <q-btn color="primary" label="Save Changes" type="submit" :loading="saving" />
              </div>
            </q-card-section>
          </q-form>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useQuestionnaireStore } from 'src/stores/questionnaire'

export default {
  name: 'QuestionnaireView',

  setup() {
    const $q = useQuasar()
    const store = useQuestionnaireStore()

    const loading = ref(false)
    const saving = ref(false)
    const formData = ref({
      user_id: '',
      case_id: '',
      petition_type: '',
      petitioner: null,
      family_name: null,
      given_name: null,
      full_middle_name: null,
      native_alphabet: null,
      street_number_name: null,
      type: null,
      type_detail: null,
      city_town: null,
      state: null,
      zip_code: null,
      province: null,
      country: null,
      dob: null,
      birth_city_town_village: null,
      birth_state_province: null,
      birth_country: null,
      citizenship_country: null,
      dual_citizenship: null,
      secondary_country: null,
      ssn: null,
      alien_registration_number: null,
      arrival_date: null,
      admission_record_number: null,
      passport_number: null,
      passport_country: null,
      passport_expiration_date: null,
      admission_class: null,
      admit_until_date: null,
      occupation: null,
      annual_income: null,
      job_title: null,
      soc_code: null,
      nontechnical_job_description: null,
      full_time_position: null,
      hours_per_week: null,
      permanent_position: null,
      new_position: null,
      wages: null,
      wages_per: null,
      worksite_type: null,
      worksite_street_number_name: null,
      work_building_type: null,
      work_type_detail: null,
      work_city_town: null,
      work_state: null,
      work_county_township: null,
      work_zip_code: null,
      apply_visa_abroad: null,
      processing_country: null,
      processing_city: null,
      file_adjustment_status: null,
      current_residence_country: null,
      foreign_address_street_number_name: null,
      foreign_address_type: null,
      foreign_type_detail: null,
      foreign_city_town: null,
      foreign_state_province: null,
      foreign_postal_code: null,
      foreign_country: null,
      simultaneous_petitions: null,
      simultaneous_petitions_details: null,
      prior_petition: null,
      prior_petition_details: null,
      removal_proceedings: null,
      removal_proceedings_details: null,
      daytime_telephone: null,
      mobile_telephone: null,
      email_address: null,
      family_members: [],
    })

    onMounted(async () => {
      try {
        loading.value = true
        await fetchQuestionnaireData()
      } catch (error) {
        console.error('Error loading questionnaire:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load questionnaire data',
        })
      } finally {
        loading.value = false
      }
    })

    const fetchQuestionnaireData = async () => {
      try {
        const data = await store.fetchQuestionnaire()
        if (data) {
          formData.value = { ...formData.value, ...data }
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        await store.saveQuestionnaire(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Changes saved successfully',
        })
      } catch (error) {
        console.error('Save error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save changes',
        })
      } finally {
        saving.value = false
      }
    }

    return {
      loading,
      saving,
      formData,
      onSubmit,
    }
  },
}
</script>

<style scoped>
.questionnaire-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
