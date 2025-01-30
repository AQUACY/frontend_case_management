<template>
  <div class="profile-section q-pa-md">
    <q-card flat bordered>
      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="green" size="3em" />
        <div class="text-grey q-mt-md">Loading profile information...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="green" label="Retry" @click="fetchProfileData" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <!-- Academic Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Academic Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.academic_degree"
                label="Academic Degree"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.citation_database_link"
                label="Citation Database Links"
                outlined
                dense
                stack-label
                type="textarea"
                autogrow
              />
            </div>
          </div>
        </div>

        <!-- Employment Information -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Employment Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.current_us_position"
                label="Current US Position"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.proposed_employment_us"
                label="Proposed Employment in US"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.same_or_similar_field"
                label="Same or Similar Field"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.alternative_field_1"
                label="Other Field Chosen 1"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.alternative_field_2"
                label="Other Field Chosen 2"
                outlined
                dense
                stack-label
              />
            </div>
          </div>
        </div>

        <!-- Research Information -->
        <div class="section-container">
          <div class="text-h6 q-mb-md">Research Activities</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.conduct_research"
                label="Conducting Research"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.number_of_papers_reviewed"
                label="Number of Papers Reviewed"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.ongoing_project_1"
                label="Ongoing Project 1"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="profileData.ongoing_project_2"
                label="Ongoing Project 2"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="profileData.editor_role"
                label="Editor Role"
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
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'ProfileSection',

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
    const profileData = ref({})

    const fetchProfileData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/cases/${props.caseId}/profile`)
        profileData.value = response.data.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading profile information. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load profile information',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchProfileData()
      }
    })

    return {
      loading,
      error,
      profileData,
      fetchProfileData,
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-section {
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
    color: $green;
    font-weight: 500;
  }
}
</style>
