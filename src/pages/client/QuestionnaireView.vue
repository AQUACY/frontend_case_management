<template>
  <q-page class="q-pa-md">
    <div class="questionnaire-container">
      <!-- Loading State -->
      <div v-if="loading" class="full-width row justify-center items-center" style="height: 400px">
        <q-spinner color="green" size="3em" />
      </div>

      <div v-else>
        <!-- Header Section -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-green q-mb-md">I-140 Questionnaire</div>
            <div class="text-caption text-grey">
              Please fill out all required information. Your answers will be used for your petition.
            </div>
          </q-card-section>
        </q-card>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- Basic Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Basic Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.petition_type"
                    label="Petition Type *"
                    :options="['EB-1A', 'EB-1B', 'EB-2 NIW']"
                    outlined
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.petitioner"
                    label="Petitioner *"
                    :options="['Employer', 'Self']"
                    outlined
                    :rules="[(val) => !!val || 'Required']"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Personal Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Personal Information</div>
              <div class="row q-col-gutter-md">
                <!-- Name Fields -->
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.family_name"
                    label="Family Name *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.given_name"
                    label="Given Name *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.full_middle_name" label="Middle Name" outlined />
                </div>

                <!-- Additional Personal Info -->
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.native_alphabet"
                    label="Native Alphabet (if applicable)"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.dob"
                    label="Date of Birth *"
                    type="date"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>

                <!-- Birth Location -->
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.city_town_village_of_birth"
                    label="City/Town/Village of Birth *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.state_of_birth" label="State of Birth" outlined />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.country_of_birth"
                    label="Country of Birth *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>

                <!-- Identification -->
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.nationality"
                    label="Nationality *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.alien_registration_number"
                    label="Alien Registration Number"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.ssn" label="Social Security Number" outlined />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Mail Address -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Mail Address</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.street_number_name"
                    label="Street Number and Name"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.type"
                    label="Type of Address [Apt, Str, Flr]"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.type_detail"
                    label="Type Details"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.city_town"
                    label="City/Town"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.state"
                    label="State"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.zip_code"
                    label="ZIP Code"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.province" label="Province" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.country" label="Country" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.mobile_telephone" label="Mobile Telephone" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.email_address"
                    label="Email Address"
                    type="email"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Last Arrival Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Information About Last Arrival</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.last_arrival_date"
                    label="Last Arrival Date"
                    type="date"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.i_94_arrival_record_number"
                    label="I-94 Arrival Record Number"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.expiration_date"
                    label="Expiration Date"
                    type="date"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.status_on_form_i_94"
                    :options="['Arrived', 'Departed']"
                    label="Status on Form I-94"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.passport_number" label="Passport Number" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.travel_document_number"
                    label="Travel Document Number"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.country_of_issuance"
                    label="Country of Issuance"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.alien_will_apply_for_visa_abroad"
                    :options="['Yes', 'No']"
                    label="Will the alien apply for a visa abroad?"
                    outlined
                  />
                </div>
                <div
                  class="col-12 col-md-6"
                  v-if="formData.alien_will_apply_for_visa_abroad === 'Yes'"
                >
                  <q-input
                    v-model="formData.visa_processing_city_town"
                    label="City/Town of Visa Processing"
                    outlined
                  />
                </div>
                <div
                  class="col-12 col-md-6"
                  v-if="formData.alien_will_apply_for_visa_abroad === 'Yes'"
                >
                  <q-input
                    v-model="formData.visa_processing_country"
                    label="Country of Visa Processing"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Visa Processing -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Visa Processing</div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select
                    v-model="formData.alien_in_us"
                    :options="['Yes', 'No']"
                    label="Is the alien currently in the US?"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.if_now_in_the_us"
                    :options="['Yes', 'No']"
                    label="Is the alien now in the US?"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.foreign_street_number_name"
                    label="Foreign Street Number and Name"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.foreign_address_type"
                    label="Foreign Address Type"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.foreign_city_town"
                    label="Foreign City/Town"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.foreign_state_province"
                    label="Foreign State/Province"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.foreign_postal_code"
                    label="Foreign Postal Code"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.foreign_country" label="Foreign Country" outlined />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Employment Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Employment Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.current_employer_name"
                    label="Current Employer Name"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.job_title" label="Job Title" outlined />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.full_time_position"
                    :options="['Yes', 'No']"
                    label="Is this a full-time position?"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.permanent_position"
                    :options="['Yes', 'No']"
                    label="Is this a permanent position?"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle2 q-mb-md">Position Details</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.occupation" label="Occupation" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.annual_income"
                    label="Annual Income"
                    outlined
                    type="number"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.soc_code" label="SOC Code" outlined />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.nontechnical_job_description"
                    label="Non-Technical Job Description"
                    type="textarea"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.hours_per_week"
                    label="Hours Per Week"
                    type="number"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.new_position"
                    :options="['Yes', 'No']"
                    label="Is this a new position?"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.wages" label="Wages" type="number" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.wages_per"
                    :options="['Hour', 'Week', 'Month', 'Year']"
                    label="Wages Per"
                    outlined
                  />
                </div>
              </div>

              <div class="text-subtitle2 q-mb-md q-mt-lg">Worksite Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.worksite_type"
                    :options="['Office', 'Home', 'Other']"
                    label="Worksite Type"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.worksite_street_number_name"
                    label="Street Address"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.work_building_type" label="Building Type" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.work_site_additional_details"
                    label="Additional Details"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.work_city_town" label="City/Town" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.work_state" label="State" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.work_county_township"
                    label="County/Township"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.work_zip_code" label="ZIP Code" outlined />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Family Members -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-green q-mb-md">Spouse and children records</div>
              <div v-for="(member, index) in formData.family_members" :key="index" class="q-mb-lg">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.family_name_last_name"
                      label="Family Name (Last Name) *"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.given_name_first_name"
                      label="Given Name (First Name) *"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.middle_name" label="Middle Name" outlined />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-select
                      v-model="member.relationship"
                      :options="['Spouse', 'Child']"
                      label="Relationship *"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.dob"
                      label="Date of Birth *"
                      type="date"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.birth_country"
                      label="Country of Birth *"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="member.adjustment_status"
                      :options="['Yes', 'No']"
                      label="Adjustment of Status"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="member.visa_abroad"
                      :options="['Yes', 'No']"
                      label="Visa Abroad"
                      outlined
                    />
                  </div>
                </div>
                <div class="row justify-end q-mt-sm">
                  <q-btn
                    flat
                    color="negative"
                    icon="delete"
                    label="Remove"
                    :loading="removingMemberId === member.id"
                    @click="() => removeFamilyMember(member, index)"
                  />
                </div>
              </div>
              <div class="row justify-end">
                <q-btn color="green" label="Add Family Member" @click="addFamilyMember" />
              </div>
            </q-card-section>
          </q-card>

          <!-- Submit Button -->
          <div class="row justify-end q-gutter-sm">
            <q-btn type="submit" color="green" label="Save Questionnaire" :loading="saving" />
            <q-btn
              v-if="formData.id"
              color="primary"
              label="Request Review"
              :loading="requestingReview"
              @click="requestReview"
            />
          </div>
        </q-form>
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
    const requestingReview = ref(false)
    const formData = ref({
      id: null,
      user_id: null,
      case_id: null,

      // Basic Information
      petition_type: '',
      petitioner: '',

      // Personal Information
      family_name: '',
      given_name: '',
      full_middle_name: '',
      native_alphabet: '',
      dob: '',
      city_town_village_of_birth: '',
      state_of_birth: '',
      country_of_birth: '',
      nationality: '',
      alien_registration_number: '',
      ssn: '',

      // Mail Address
      street_number_name: '',
      type: '',
      type_detail: '',
      city_town: '',
      state: '',
      zip_code: '',
      province: '',
      country: '',
      mobile_telephone: '',
      email_address: '',

      // Last Arrival Information
      last_arrival_date: '',
      i_94_arrival_record_number: '',
      expiration_date: '',
      status_on_form_i_94: '',
      passport_number: '',
      travel_document_number: '',
      country_of_issuance: '',
      expiration_date_for_passport: '',

      // Visa Processing
      alien_will_apply_for_visa_abroad: null,
      visa_processing_city_town: '',
      visa_processing_country: '',
      alien_in_us: null,
      if_now_in_the_us: '',
      foreign_street_number_name: '',
      foreign_address_type: '',
      foreign_city_town: '',
      foreign_state_province: '',
      foreign_postal_code: '',
      foreign_country: '',

      // Employment Information
      current_employer_name: '',
      job_title: '',
      full_time_position: null,
      permanent_position: null,
      occupation: '',
      annual_income: '',
      soc_code: '',
      nontechnical_job_description: '',
      hours_per_week: '',
      new_position: null,
      wages: '',
      wages_per: '',
      worksite_type: '',
      worksite_street_number_name: '',
      work_building_type: '',
      work_site_additional_details: '',
      work_city_town: '',
      work_state: '',
      work_county_township: '',
      work_zip_code: '',

      // Family Members
      family_members: [],
    })

    const removingMemberId = ref(null)

    onMounted(async () => {
      try {
        loading.value = true
        const data = await store.fetchQuestionnaire()
        if (data) {
          formData.value = {
            ...data,
            family_members: data.family_members || [],
          }
          console.log('Loaded questionnaire data:', formData.value)
        }
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

    const addFamilyMember = () => {
      console.log('Adding new family member')
      formData.value.family_members.push({
        family_name_last_name: '',
        given_name_first_name: '',
        middle_name: '',
        relationship: null,
        dob: null,
        birth_country: '',
        adjustment_status: 'No',
        visa_abroad: 'No',
      })
      console.log('Current family members:', formData.value.family_members)
    }

    const removeFamilyMember = async (member, index) => {
      try {
        if (member.id) {
          await store.deleteFamilyMember(member.id)
        }
        formData.value.family_members.splice(index, 1)
        console.log('Family member removed, remaining:', formData.value.family_members)
      } catch (error) {
        console.error('Error removing family member:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to remove family member',
        })
      }
    }

    const requestReview = async () => {
      try {
        requestingReview.value = true
        await store.requestReview()
        $q.notify({
          type: 'positive',
          message: 'Review request sent successfully',
        })
      } catch (error) {
        console.error('Error requesting review:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to request review',
        })
      } finally {
        requestingReview.value = false
      }
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        await store.saveQuestionnaire(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Questionnaire saved successfully',
        })
      } catch (error) {
        console.error('Save error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save questionnaire',
        })
      } finally {
        saving.value = false
      }
    }

    return {
      loading,
      saving,
      requestingReview,
      formData,
      removingMemberId,
      addFamilyMember,
      removeFamilyMember,
      requestReview,
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

.q-card {
  transition: all 0.2s ease-in-out;
}

.q-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
