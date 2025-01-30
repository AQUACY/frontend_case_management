<template>
  <div class="my-profile q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-green">My Profile</div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <!-- Academic Degree -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.academic_degree"
                class="q-pa-md"
                label="Academic Degree"
                outlined
                :rules="[(val) => !!val || 'Academic degree is required']"
              />
            </div>

            <!-- Citation Database Link -->
            <div class="col-12">
              <q-input
                class="q-pa-md"
                v-model="formData.citation_database_link"
                label="Citation Database Links"
                type="textarea"
                outlined
                :rules="[(val) => !!val || 'Citation database links are required']"
                hint="Include links to Google Scholar, ResearchGate, PubMed, ORCID, etc."
              />
            </div>

            <!-- Current US Position -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.current_us_position"
                label="Current US Position"
                outlined
                class="q-pa-md"
                :rules="[(val) => !!val || 'Current US position is required']"
              />
            </div>

            <!-- Proposed Employment US -->
            <div class="col-12 col-md-6">
              <q-select
                class="q-pa-md"
                v-model="formData.proposed_employment_us"
                :options="['yes', 'no']"
                label="Proposed Employment in US"
                outlined
                :rules="[(val) => !!val || 'Please select yes or no']"
              />
            </div>

            <!-- Same or Similar Field -->
            <div class="col-12 col-md-6">
              <q-select
                class="q-pa-md"
                v-model="formData.same_or_similar_field"
                :options="['yes', 'no']"
                label="Same or Similar Field"
                outlined
                :rules="[(val) => !!val || 'Please select yes or no']"
              />
            </div>

            <!-- Alternative Fields -->
            <div class="col-12 col-md-6">
              <q-input
                class="q-pa-md"
                v-model="formData.alternative_field_1"
                label="Alternative Field 1"
                outlined
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                class="q-pa-md"
                v-model="formData.alternative_field_2"
                label="Alternative Field 2"
                outlined
              />
            </div>

            <!-- Conduct Research -->
            <div class="col-12 col-md-6">
              <q-select
                class="q-pa-md"
                v-model="formData.conduct_research"
                :options="['yes', 'no']"
                label="Conduct Research"
                outlined
                :rules="[(val) => !!val || 'Please select yes or no']"
              />
            </div>

            <!-- Ongoing Projects -->
            <div class="col-12 col-md-6">
              <q-input
                class="q-pa-md"
                v-model="formData.ongoing_project_1"
                label="Ongoing Project 1"
                outlined
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                class="q-pa-md"
                v-model="formData.ongoing_project_2"
                label="Ongoing Project 2"
                outlined
              />
            </div>

            <!-- Number of Papers Reviewed -->
            <div class="col-12 col-md-6">
              <q-input
                class="q-pa-md"
                v-model="formData.number_of_papers_reviewed"
                label="Number of Papers Reviewed"
                type="number"
                outlined
                :rules="[(val) => !!val || 'Number of papers reviewed is required']"
              />
            </div>

            <!-- Editor Role -->
            <div class="col-12 col-md-6">
              <q-select
                class="q-pa-md"
                v-model="formData.editor_role"
                :options="['yes', 'no']"
                label="Editor Role"
                outlined
                :rules="[(val) => !!val || 'Please select yes or no']"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="row justify-end q-mt-md">
            <q-btn type="submit" color="primary" :loading="store.loading" label="Save Profile" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Notifications -->
    <q-dialog v-model="showNotification">
      <q-card>
        <q-card-section :class="notificationColor">
          <div class="text-h6 text-green">{{ notificationTitle }}</div>
          <div class="text-body2">{{ notificationMessage }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useMyProfile } from 'src/stores/myprofile'

export default {
  name: 'MyProfile',

  setup() {
    const store = useMyProfile()
    const showNotification = ref(false)
    const notificationTitle = ref('')
    const notificationMessage = ref('')
    const notificationColor = ref('')

    const formData = ref({
      academic_degree: '',
      citation_database_link: '',
      current_us_position: '',
      proposed_employment_us: '',
      same_or_similar_field: '',
      alternative_field_1: '',
      alternative_field_2: '',
      conduct_research: '',
      ongoing_project_1: '',
      ongoing_project_2: '',
      number_of_papers_reviewed: '',
      editor_role: '',
    })

    const showSuccess = (message) => {
      notificationTitle.value = 'Success'
      notificationMessage.value = message
      notificationColor.value = 'bg-positive text-white'
      showNotification.value = true
    }

    const showError = (message) => {
      notificationTitle.value = 'Error'
      notificationMessage.value = message
      notificationColor.value = 'bg-negative text-white'
      showNotification.value = true
    }

    const onSubmit = async () => {
      try {
        await store.saveProfile(formData.value)
        showSuccess('Profile saved successfully')
      } catch (error) {
        showError(error.message || 'Failed to save profile')
      }
    }

    onMounted(async () => {
      await store.fetchMyProfile()
      if (store.profile) {
        formData.value = { ...store.profile }
      }
    })

    return {
      store,
      formData,
      showNotification,
      notificationTitle,
      notificationMessage,
      notificationColor,
      onSubmit,
    }
  },
}
</script>

<style lang="scss" scoped>
.my-profile {
  max-width: 1200px;
  margin: 0 auto;

  .q-card {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
