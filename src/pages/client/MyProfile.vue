<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6 text-center">Updated at {{ formatDate(oldprofile.updated_at) }}</div>
        <div class="text-subtitle2 text-center">
          Please keep this profile updated when you request a new I-140/I-129 case evaluation or
          resume the case preparation for the existing case.
        </div>
      </q-card-section>

      <q-separator />

      <q-form @submit.prevent="updateProfile">
        <q-card-section>
          <q-input
            v-model="oldprofile.academic_degree"
            label="Highest Academic Degree"
            outlined
            hint="e.g. PhD in Computer Science at Sri Venkateswara University, India"
            class="q-pa-md q-mb-md"
          />

          <q-input
            v-model="oldprofile.citation_database_link"
            label="Citation Database Link (Google Scholar Profile, ResearchGate, or Impactio, etc.)"
            outlined
            hint="During case preparation or whenever you request a new case evaluation, please make sure that you are listed as an author to all the articles in the profile and make the profile public."
            class="q-pa-md"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="oldprofile.current_us_position"
            label="Current U.S. Position"
            outlined
            hint="e.g. Postdoctoral Researcher/PhD student at University of California, CA"
            class="q-pa-md"
          />
          <q-input
            v-model="oldprofile.proposed_employment_us"
            label="Proposed Employment in the U.S."
            outlined
            hint="Your current U.S. position will serve as your proposed employment for the purpose of I-140 petition."
            class="q-pa-md"
          />

          <q-option-group
            v-model="oldprofile.same_or_similar_field"
            label="In your proposed employment, do you expect to work in the same or similar field?"
            :options="sameOrSimilarFieldOptions"
            class="q-pa-md"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="oldprofile.research_and_publication"
            label="Do you continue to conduct research and publish papers?"
            outlined
            class="q-pa-md"
          />
          <q-input
            v-model="oldprofile.ongoing_projects"
            label="Ongoing Projects"
            outlined
            class="q-pa-md"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="oldprofile.number_of_papers_reviewed"
            label="Number of Papers Reviewed"
            type="number"
            outlined
            class="q-pa-md"
          />
          <q-option-group
            v-model="oldprofile.editor_role"
            label="Do you have any editor role?"
            :options="editorRoleOptions"
            class="q-pa-md"
          />
        </q-card-section>

        <q-card-section align="center">
          <div class="sticky-button-container">
            <q-btn
              label="Save Profile"
              color="primary"
              type="submit"
              :disable="isFinalized"
              :loading="loading"
              class="full-width"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useMyProfile } from 'stores/myprofile'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const caseProfile = useMyProfile()
    const $q = useQuasar()
    const { loading } = storeToRefs(caseProfile)
    const oldprofile = ref({
      academic_degree: '',
      citation_database_link: '',
      current_us_position: '',
      proposed_employment_us: '',
      same_or_similar_field: '',
      research_and_publication: '',
      ongoing_projects: '',
      number_of_papers_reviewed: 0,
      editor_role: '',
    })

    // const lastUpdated = ref('05/26/2024 8:17 am')
    const sameOrSimilarFieldOptions = [
      { label: 'Yes, I will continue to work in the same or similar field.', value: 'yes' },
      { label: 'No, I have changed my area of expertise from ... to ....', value: 'no' },
    ]
    const editorRoleOptions = [
      { label: 'Yes, I have an editor role.', value: 'yes' },
      { label: 'No, I do not have an editor role.', value: 'no' },
    ]

    const formatDate = (date) => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }
      return new Date(date).toLocaleString('en-US', options)
    }

    onMounted(async () => {
      try {
        await caseProfile.fetchMyProfile()
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    })

    const updateProfile = async () => {
      // Logic to handle updating the profile
      console.log('Profile updated:', oldprofile.value)
      try {
        // Convert cited_project to boolean explicitly
        let citedProjectValue = false
        if (
          oldprofile.value.cited_project &&
          oldprofile.value.cited_project.toLowerCase() === 'yes'
        ) {
          citedProjectValue = true
        }

        const payload = {
          name: oldprofile.value.name,
          dependent_or_independent: oldprofile.value.dependent_or_independent,
          title: oldprofile.value.title,
          institution: oldprofile.value.institution,
          country: oldprofile.value.country,
          faculty_biography_link: oldprofile.value.faculty_biography_link,
          google_scholar_link: oldprofile.value.google_scholar_link,
          relationship: oldprofile.value.relationship,
          projects_discussed: oldprofile.value.projects_discussed,
          cited_project: citedProjectValue, // Use the explicitly converted boolean
          cited_project_details: oldprofile.value.cited_project_details,
          status: oldprofile.value.status,
        }

        console.log('Updating recommender with payload:', payload) // Debug log

        await oldprofile.value.updateRecommender(payload)

        $q.notify({
          type: 'positive',
          message: 'Recommender information saved successfully!',
        })
      } catch (error) {
        console.error(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save profile information. Please try again.',
        })
      } finally {
        loading.value = false
      }
    }

    return {
      oldprofile: computed(() => caseProfile.profile),
      // lastUpdated,
      sameOrSimilarFieldOptions,
      editorRoleOptions,
      updateProfile,
      formatDate,
    }
  },
}
</script>
<style scoped>
.sticky-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  /* z-index: 1000; */
}
</style>
