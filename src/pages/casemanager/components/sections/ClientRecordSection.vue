<template>
  <div class="client-record-section q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <!-- Petition Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Petition Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="petitionTypesDisplay"
                label="Which type of petition(s) are you retaining us to file for you at this time"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="clientData.petition_category"
                label="Petition Category"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Personal Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-input
                readonly
                v-model="clientData.last_name"
                label="Last Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                readonly
                v-model="clientData.first_name"
                label="First Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                readonly
                v-model="clientData.middle_name"
                label="Middle Name"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                readonly
                v-model="clientData.title"
                label="Title"
                outlined
                dense
                stack-label
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="clientData.date_of_birth"
                label="Date of Birth"
                outlined
                dense
                stack-label
              >
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="clientData.gender"
                label="Gender"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="clientData.country_of_birth"
                label="Country of Birth"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="section-container">
          <div class="text-h6 q-mb-md">Contact Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="clientData.street_address"
                label="Street Address"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="clientData.address_line_2"
                label="Address Line 2"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input readonly v-model="clientData.city" label="City" outlined dense stack-label />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="clientData.state"
                label="State"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                readonly
                v-model="clientData.zip_code"
                label="ZIP Code"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- family members -->
        <div class="section-container">
          <div class="text-h6 q-mb-md q-mt-md">Family Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="clientData.has_dependents"
                label="Has Dependents"
                outlined
                dense
                stack-label
                hint="1 = Yes, 0 = No"
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="clientData.marital_status"
                label="Marital Status"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-12">
              <div class="text-h6 q-mb-md q-mt-md">Dependents</div>
              <div v-if="clientData.dependents && clientData.dependents.length">
                <div
                  v-for="(dependent, index) in clientData.dependents"
                  :key="index"
                  class="q-mb-sm"
                >
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.last_name"
                        :label="`${index + 1}. Last Name`"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.first_name"
                        :label="'First Name'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.middle_name"
                        :label="'Middle Name'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        v-model="dependent.relation"
                        :label="'Relation'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        v-model="dependent.country_of_birth"
                        :label="'Country of Birth'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        v-model="dependent.date_of_birth"
                        :label="'Date of Birth'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        v-model="dependent.gender"
                        :label="'Gender'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.passport_expiration"
                        :label="'Passport Expiration'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.visa_processing_option"
                        :label="'Visa Processing Option'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12 col-md-4">
                      <q-input
                        v-model="dependent.processing_country"
                        :label="'Processing Country'"
                        outlined
                        dense
                        stack-label
                        readonly
                      />
                    </div>
                    <div class="col-12">
                      <q-input
                        v-model="dependent.address"
                        :label="'Address'"
                        outlined
                        dense
                        stack-label
                        class="q-mb-md"
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <q-input
                v-else
                readonly
                value="No dependents"
                label="Dependents"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'ClientRecordSection',

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
    const clientData = ref({})

    const petitionTypesDisplay = computed(() => {
      if (!clientData.value?.petition_types) return ''
      try {
        return JSON.parse(clientData.value.petition_types).join(', ')
      } catch (e) {
        console.log(e)
        return clientData.value.petition_types
      }
    })

    const fetchClientData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/auth/client-records/${props.caseId}`)
        clientData.value = response.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading client information. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load client information',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchClientData()
      }
    })

    return {
      loading,
      error,
      clientData,
      petitionTypesDisplay,
    }
  },
}
</script>

<style lang="scss" scoped>
.client-record-section {
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
}
</style>
