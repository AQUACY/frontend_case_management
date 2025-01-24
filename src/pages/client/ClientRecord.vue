<template>
  <q-page class="q-pa-md">
    <div class="client-record-container">
      <!-- Loading State -->
      <div v-if="loading" class="full-width row justify-center items-center" style="height: 400px">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-else>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- Petition Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 q-mb-md">Petition Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.petition_types"
                    :options="petitionTypeOptions"
                    label="Which type of petition(s) are you retaining us to file for you at this time? Please check all that apply:"
                    multiple
                    outlined
                    emit-value
                    map-options
                    :value="formData.petition_types"
                    @update:model-value="handlePetitionTypeChange"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="formData.petition_category"
                    :options="['EB-1A', 'EB-2 NIW']"
                    label="Petition Category"
                    outlined
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Personal Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 q-mb-md">Personal Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-3">
                  <q-input v-model="formData.last_name" label="Last Name" outlined />
                </div>
                <div class="col-12 col-md-3">
                  <q-input v-model="formData.first_name" label="First Name" outlined />
                </div>
                <div class="col-12 col-md-3">
                  <q-input v-model="formData.middle_name" label="Middle Name" outlined />
                </div>
                <div class="col-12 col-md-3">
                  <q-select
                    v-model="formData.title"
                    :options="['Mr.', 'Mrs.', 'Ms.', 'Dr.']"
                    label="Title"
                    outlined
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="formData.date_of_birth"
                    label="Date of Birth"
                    type="date"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-select
                    v-model="formData.gender"
                    :options="['Male', 'Female', 'Other']"
                    label="Gender"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.country_of_birth" label="Country of Birth" outlined />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Contact Information -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 q-mb-md">Contact Information</div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input v-model="formData.street_address" label="Street Address" outlined />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.address_line_2" label="Address Line 2" outlined />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.city" label="City" outlined />
                </div>
                <div class="col-12 col-md-4">
                  <q-select
                    v-model="formData.state"
                    :options="stateOptions"
                    label="State"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="formData.zip_code" label="ZIP Code" outlined />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Dependents Section -->
          <q-card flat bordered v-if="formData.has_dependents">
            <q-card-section>
              <div class="text-h6 q-mb-md">Dependents</div>
              <div v-for="(dependent, index) in formData.dependents" :key="index" class="q-mb-lg">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.last_name" label="Last Name" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.first_name" label="First Name" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.middle_name" label="Middle Name" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-select
                      v-model="dependent.relation"
                      :options="['Spouse', 'Child']"
                      label="Relation"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.date_of_birth"
                      label="Date of Birth"
                      type="date"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.passport_number" label="Passport Number" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.passport_expiration"
                      label="Passport Expiry"
                      type="date"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.gender" label="Gender" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.country_of_birth"
                      label="Country of Birth"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model="dependent.place_of_birth" label="Place of Birth" outlined />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.visa_processing_option"
                      label="Visa Processing Option"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.processing_country"
                      label="Visa Processing Option"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input
                      v-model="dependent.visa_expiry"
                      label="Visa Expiry"
                      type="date"
                      outlined
                    />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-checkbox
                      v-model="dependent.no_passport_applied"
                      label="No Passport Applied"
                      :true-value="0"
                      :false-value="1"
                    />
                  </div>
                </div>
                <div class="row justify-end q-mt-sm">
                  <q-btn
                    color="negative"
                    flat
                    label="Remove Dependent"
                    @click="removeDependent(dependent.id)"
                    :loading="removingDependentId === dependent.id"
                  />
                </div>
              </div>
              <div class="row justify-end q-mt-md">
                <q-btn color="primary" label="Add Dependent" @click="addDependent" />
              </div>
            </q-card-section>
          </q-card>

          <!-- Submit Button -->
          <div class="row justify-end q-mt-lg">
            <q-btn color="primary" label="Save Changes" type="submit" :loading="saving" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useClientRecordsStore } from 'src/stores/clientrecords'

export default {
  name: 'ClientRecord',

  setup() {
    const $q = useQuasar()
    const store = useClientRecordsStore()

    const loading = ref(false)
    const saving = ref(false)
    const stateOptions = ref(['AL', 'AK', 'AZ' /* Add all states */])

    const petitionTypeOptions = ref([
      {
        label: 'I-140 EB-1A',
        value: 'I-140 EB-1A',
      },
      {
        label: 'I-140 EB-2 NIW',
        value: 'I-140 EB-2 NIW',
      },
    ])

    const formData = ref({
      petition_types: [],
      petition_category: null,
      filing_plan_eb1: null,
      filing_plan_eb2: null,
      previous_visa_filing: null,
      i485_filing_plan: null,
      last_name: '',
      first_name: '',
      middle_name: '',
      gender: null,
      title: null,
      date_of_birth: null,
      country_of_birth: '',
      country_of_citizenship: '',
      in_us: false,
      visa_status: '',
      visa_expiration: null,
      passport_expiration: null,
      no_passport_applied: false,
      admit_until_date: null,
      applying_new_visa: false,
      visa_type: '',
      latest_entry_date: null,
      latest_visa_status: '',
      j_visa_status: false,
      communist_party_member: false,
      employer_name: '',
      job_title: '',
      proposed_employment_field: '',
      company_name: '',
      job_description: '',
      full_time: false,
      permanent_position: false,
      worksite_city: '',
      worksite_state: '',
      paper_publication_year: '',
      asylum_applied: false,
      street_address: '',
      address_line_2: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      email: '',
      phone_number: '',
      referral_source: '',
      social_media_source: '',
      has_dependents: false,
      marital_status: null,
      dependents: [],
    })

    const removingDependentId = ref(null)

    onMounted(async () => {
      try {
        loading.value = true
        await fetchClientRecord()
      } catch (error) {
        console.error('Error loading client record:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load client record',
        })
      } finally {
        loading.value = false
      }
    })

    const handlePetitionTypeChange = (val) => {
      formData.value.petition_types = Array.isArray(val) ? val : []
    }

    const fetchClientRecord = async () => {
      try {
        const data = await store.fetchClientRecord()
        if (data) {
          if (typeof data.petition_types === 'string') {
            try {
              data.petition_types = JSON.parse(data.petition_types)
            } catch (error) {
              data.petition_types = []
              console.log(error)
            }
          }
          data.petition_types = Array.isArray(data.petition_types) ? data.petition_types : []

          formData.value = { ...formData.value, ...data }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addDependent = () => {
      formData.value.dependents.push({
        last_name: '',
        first_name: '',
        middle_name: '',
        relation: null,
        country_of_birth: '',
        date_of_birth: null,
        passport_expiration: null,
        no_passport_applied: false,
        gender: null,
        address: '',
        visa_processing_option: '',
        processing_country: '',
      })
    }

    const removeDependent = async (dependentId) => {
      try {
        removingDependentId.value = dependentId
        await store.removeDependent(formData.value.id, dependentId)

        // Remove from local state
        formData.value.dependents = formData.value.dependents.filter(
          (dep) => dep.id !== dependentId,
        )

        $q.notify({
          type: 'positive',
          message: 'Dependent removed successfully',
        })
      } catch (error) {
        console.error('Remove dependent error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to remove dependent',
        })
      } finally {
        removingDependentId.value = null
      }
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        await store.saveClientRecord(formData.value)
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
      stateOptions,
      petitionTypeOptions,
      handlePetitionTypeChange,
      addDependent,
      removeDependent,
      onSubmit,
      removingDependentId,
    }
  },
}
</script>

<style scoped>
.client-record-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
