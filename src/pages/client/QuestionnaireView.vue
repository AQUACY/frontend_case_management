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
                  <q-input v-model="formData.petitioner" label="Petitioner" outlined />
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
                    :rules="[(val) => !!val || 'Required']"
                    outlined
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
              <div v-for="(member, index) in formData.family_members" :key="index" class="q-mb-lg">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.family_name" label="Family Member Name" outlined />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.given_name" label="Given Member Name" outlined />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.full_middle_name" label="Middle  Name" outlined />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.birth_country" label="Birth Country" outlined />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.adjustment_status"
                      label="Applying for Adjustment of Status (filing an I-485)"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model="member.immigrant_visa"
                      label="Applying for an immigrant visa abroad to be admitted as a US permanent resident"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-select
                      v-model="member.relationship"
                      :options="['Spouse', 'Child', 'Parent', 'Sibling']"
                      label="Relationship"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <q-input v-model="member.dob" label="Date of Birth" type="date" outlined />
                  </div>
                </div>
                <div class="row justify-end q-mt-sm">
                  <q-btn flat color="negative" label="Remove" @click="removeFamilyMember(index)" />
                </div>
              </div>
              <div class="row justify-end">
                <q-btn color="primary" label="Add Family Member" @click="addFamilyMember" />
              </div>
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
      street_number_name: '',
      city_town: '',
      state: '',
      zip_code: '',
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

    const removeFamilyMember = (index) => {
      formData.value.family_members.splice(index, 1)
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
