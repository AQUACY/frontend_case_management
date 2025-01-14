<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6 text-center">Updated at {{ lastUpdated }}</div>
        <div class="text-subtitle2 text-center">
          Please keep this profile updated when you request a new I-140/I-129 case evaluation or
          resume the case preparation for the existing case.
        </div>
      </q-card-section>

      <q-separator />

      <q-form @submit.prevent="updateProfile">
        <q-card-section>
          <q-input
            v-model="profile.highest_academic_degree"
            label="Highest Academic Degree"
            outlined
            hint="e.g. PhD in Computer Science at Sri Venkateswara University, India"
          />

          <q-input
            v-model="profile.citation_database_link"
            label="Citation Database Link (Google Scholar Profile, ResearchGate, or Impactio, etc.)"
            outlined
            hint="During case preparation or whenever you request a new case evaluation, please make sure that you are listed as an author to all the articles in the profile and make the profile public."
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="profile.current_us_position"
            label="Current U.S. Position"
            outlined
            hint="e.g. Postdoctoral Researcher/PhD student at University of California, CA"
          />
          <q-input
            v-model="profile.proposed_employment_us"
            label="Proposed Employment in the U.S."
            outlined
            hint="Your current U.S. position will serve as your proposed employment for the purpose of I-140 petition."
          />

          <q-option-group
            v-model="profile.same_or_similar_field"
            label="In your proposed employment, do you expect to work in the same or similar field?"
            :options="sameOrSimilarFieldOptions"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="profile.research_and_publication"
            label="Do you continue to conduct research and publish papers?"
            outlined
          />
          <q-input v-model="profile.ongoing_projects" label="Ongoing Projects" outlined />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="profile.number_of_papers_reviewed"
            label="Number of Papers Reviewed"
            type="number"
            outlined
          />
          <q-option-group
            v-model="profile.editor_role"
            label="Do you have any editor role?"
            :options="editorRoleOptions"
          />
        </q-card-section>

        <q-card-section align="center">
          <q-btn label="Save Changes" type="submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useMyProfile } from 'stores/myprofile'

export default {
  setup() {
    const caseProfile = useMyProfile()

    const profile = ref({
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

    const lastUpdated = ref('05/26/2024 8:17 am')
    const sameOrSimilarFieldOptions = [
      { label: 'Yes, I will continue to work in the same or similar field.', value: 'yes' },
      { label: 'No, I have changed my area of expertise from ... to ....', value: 'no' },
    ]
    const editorRoleOptions = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]

    onMounted(async () => {
      try {
        await caseProfile.fetchMyProfile()
        profile.value
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    })

    const updateProfile = () => {
      // Logic to handle updating the profile
      console.log('Profile updated:', profile.value)
    }

    return {
      profile,
      lastUpdated,
      sameOrSimilarFieldOptions,
      editorRoleOptions,
      updateProfile,
    }
  },
}
</script>
