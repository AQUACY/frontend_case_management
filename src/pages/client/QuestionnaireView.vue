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

        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- Basic Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Basic Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.petition_type"
                    label="Petition Type"
                    readonly
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.petitioner"
                    label="Petitioner"
                    :options="['Employer', 'Self']"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Personal Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Personal Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.family_name"
                    label="Family Name"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.given_name"
                    label="Given Name"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.full_middle_name" label="Middle Name" outlined />
                </div>
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
                    label="Date of Birth"
                    type="date"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <!-- Contact Information -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Contact Information</div>
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
                    v-model="formData.type_details"
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
                  <q-input
                    v-model="formData.phone"
                    label="Phone Number"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Immigration Information -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Immigration Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.passport_number"
                    label="Passport Number"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.passport_expiration_date"
                    label="Passport Expiration Date"
                    type="date"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.country_of_birth"
                    label="Country of Birth"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="formData.country_of_citizenship"
                    label="Country of Citizenship"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.dual_citizenship"
                    :options="['Yes', 'No']"
                    label="Do you have dual citizenship?"
                    emit-value
                    map-options
                    outlined
                    clearable
                  />
                </div>
                <div class="col-12 col-md-6" v-if="formData.dual_citizenship === 'Yes'">
                  <q-input
                    v-model="formData.second_citizenship"
                    label="Second Country of Citizenship"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Employment Information -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Employment Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.current_employer" label="Current Employer" outlined />
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
                    v-model="formData.work_type_detail"
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

          <!-- Additional Information -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Additional Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select
                    v-model="formData.prior_petition"
                    :options="['Yes', 'No']"
                    label="Have you ever filed an immigrant petition before?"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="formData.removal_proceedings"
                    :options="['Yes', 'No']"
                    label="Have you ever been in removal proceedings?"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="formData.additional_information"
                    label="Additional Information"
                    type="textarea"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-md text-blue text-bold">Family Information</div>
              <div
                v-for="(member, index) in formData.family_members"
                :key="member.id || index"
                class="q-mb-lg"
              >
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.family_name"
                      label="Family Name"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.given_name"
                      label="Given Name"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-select
                      v-model="member.relationship"
                      :options="['Spouse', 'Child']"
                      label="Relationship"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.dob"
                      label="Date of Birth"
                      type="date"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.birth_country"
                      label="Country of Birth"
                      :rules="[(val) => !!val || 'Required']"
                      outlined
                    />
                  </div>
                </div>
                <div class="row justify-end q-mt-sm">
                  <q-btn
                    flat
                    color="negative"
                    label="Remove"
                    :loading="removingMemberId === member.id"
                    @click="removeFamilyMember(member)"
                  />
                </div>
              </div>
              <div class="row justify-end">
                <q-btn color="primary" label="Add Family Member" @click="addFamilyMember" />
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                type="submit"
                color="primary"
                label="Save Questionnairre"
                :loading="loading"
                class="full-width"
              />
            </q-card-section>
          </q-card>
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
    const formData = ref({
      id: null,
      user_id: null,
      case_id: null,
      petition_type: '',
      family_name: '',
      given_name: '',
      full_middle_name: '',
      native_alphabet: '',
      dob: '',
      street_number_name: '',
      type: '',
      type_details: '',
      city_town: '',
      state: '',
      zip_code: '',
      phone: '',
      email: '',
      dual_citizenship: null,
      second_citizenship: '',
      passport_number: '',
      passport_expiration_date: '',
      country_of_birth: '',
      country_of_citizenship: '',
      full_time_position: '',
      permanent_position: '',
      prior_petition: '',
      removal_proceedings: '',
      additional_information: '',
      family_members: [],
    })

    const removingMemberId = ref(null)

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
          formData.value = { ...formData.value, ...data.data }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addFamilyMember = () => {
      formData.value.family_members.push({
        family_name: '',
        given_name: '',
        full_middle_name: '',
        relationship: null,
        dob: null,
        birth_country: '',
        adjustment_status: 'No',
        immigrant_visa: 'No',
      })
    }

    const removeFamilyMember = async (member) => {
      try {
        removingMemberId.value = member.id

        if (member.id) {
          // If the member has an ID, it exists in the database
          await store.deleteFamilyMember(formData.value.id, member.id)
          $q.notify({
            type: 'positive',
            message: 'Family member removed successfully',
          })
        }

        // Remove from local state
        const index = formData.value.family_members.findIndex(
          (m) => m.id === member.id || m === member,
        )
        if (index > -1) {
          formData.value.family_members.splice(index, 1)
        }
      } catch (error) {
        console.error('Error removing family member:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to remove family member',
        })
      } finally {
        removingMemberId.value = null
      }
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        if (formData.value.id) {
          await store.updateQuestionnaire(formData.value)
        } else {
          await store.saveQuestionnaire(formData.value)
        }
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
      formData,
      // addingMemberId,
      removingMemberId,
      addFamilyMember,
      removeFamilyMember,
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
