<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">Recommenders</div>
    <div class="q-pa-md bg-grey-1 rounded-borders">
      <div class="text-subtitle1 q-mb-md">Important Guidelines for Recommenders</div>

      <div class="q-mb-md">
        <div class="text-weight-medium q-mb-sm">Independent vs Dependent Recommenders:</div>
        <p>
          An independent recommendation letter originates from someone who has never worked with
          you, collaborated with you, or been professionally or personally affiliated with you. This
          could be someone who has cited your paper but never worked with you, or someone who
          attended your conference presentation without any collaboration. Please note that an
          individual who has worked at the same institution or organization at the same time as you
          but did not directly collaborate with you might still be considered a dependent
          recommender by the immigration officer. The officer can review both of your CVs and decide
          whether the relationship is close enough to be deemed dependent. As such, it is advisable
          to seek out truly independent recommenders who have no connection to you to strengthen
          your case.
        </p>
        <p>
          A dependent recommender is someone with whom you have worked, such as your supervisor or
          Ph.D. advisor. Please note that recommenders from government organizations can sometimes
          make good candidates, but some government employees at certain government organizations
          are subject to restrictions that prevent them from endorsing letters in support of
          immigration petitions.
        </p>
      </div>

      <div class="q-mb-md">
        <div class="text-weight-medium q-mb-sm">
          For 2 Recommendation Letters (NIW standard case prep):
        </div>
        <ul class="q-mb-md">
          <li>
            List 1-2 dependent recommender candidates and 2-3 independent recommender candidates
          </li>
          <li>Try to include at least 1 US-based independent recommender</li>
          <li>Focus on established members of the field (professors, senior researchers)</li>
          <li>Exclude students; postdocs/fellows only if necessary</li>
        </ul>
      </div>

      <div class="q-mb-md">
        <div class="text-weight-medium q-mb-sm">
          For 2 Recommendation Letters (EB1A, EB1B, or O1A):
        </div>
        <ul class="q-mb-md">
          <li>Include 4-5 independent recommender candidates</li>
          <li>Prioritize candidates who have cited your work</li>
          <li>Try to include at least 1 international recommender</li>
          <li>Exclude students, fellows, and postdocs</li>
          <li>For O1 cases: Must submit at least 1 US-based independent recommender</li>
        </ul>
      </div>

      <div class="q-mb-md">
        <div class="text-weight-medium q-mb-sm">
          For 4 Recommendation Letters (NIW, EB1A, EB1B, O1):
        </div>
        <ul class="q-mb-md">
          <li>List 2-3 dependent candidates and 4-5 independent candidates</li>
          <li>For NIW: Include 2-3 US-based independent recommenders if possible</li>
          <li>For EB1A, EB1B, O1: Include mix of international and US-based recommenders</li>
          <li>Aim for 1-2 independent recommenders who have cited your work</li>
          <li>Exclude students, fellows, and postdocs (except postdocs for NIW if necessary)</li>
        </ul>
      </div>

      <div class="text-caption text-grey-8">
        Your progress can be saved at any time by clicking "Save Recommenders" at the bottom of the
        form.
      </div>
    </div>
    <!-- Existing Recommenders -->
    <div class="row q-col-gutter-md q-mb-xl">
      <div v-for="(recommender, index) in existingRecommenders" :key="index" class="col-12">
        <q-card bordered>
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-h6">Recommender {{ index + 1 }}</div>
              <div>
                <q-btn
                  v-if="!recommender.isEditing"
                  flat
                  round
                  color="primary"
                  icon="edit"
                  @click="startEditing(recommender)"
                  :disable="recommender.status === 'finalized'"
                />
                <q-chip
                  v-if="recommender.status === 'finalized'"
                  color="green"
                  text-color="white"
                  label="Finalized"
                />
              </div>
            </div>
          </q-card-section>

          <!-- View Mode -->
          <q-card-section v-if="!recommender.isEditing">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Name:</div>
                <div>{{ recommender.name }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Dependent or Independent:</div>
                <div>{{ recommender.dependent_or_independent }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Title/Position:</div>
                <div>{{ recommender.title }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Institution:</div>
                <div>{{ recommender.institution }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Country:</div>
                <div>{{ recommender.country }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Faculty Biography Link:</div>
                <div>{{ recommender.faculty_biography_link }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Google Scholar Link:</div>
                <div>{{ recommender.google_scholar_link }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">How They Know Me:</div>
                <div>{{ recommender.relationship }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-weight-medium">Projects Discussed:</div>
                <div>{{ recommender.projects_discussed }}</div>
              </div>
              <div class="col-12">
                <div class="text-weight-medium">Has Cited Project:</div>
                <div>{{ recommender.cited_project ? 'Yes' : 'No' }}</div>
              </div>
              <div v-if="recommender.cited_project" class="col-12">
                <div class="text-weight-medium">Citation Details:</div>
                <div style="white-space: pre-line">{{ recommender.cited_project_details }}</div>
              </div>
            </div>
          </q-card-section>

          <!-- Edit Mode -->
          <q-card-section v-else>
            <q-form @submit="updateRecommender(recommender)" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="recommender.name" label="Name of recommender" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="recommender.dependent_or_independent"
                    label="Dependent or Independent"
                    outlined
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="recommender.title" label="Title/position" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="recommender.institution" label="Institution" outlined />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="recommender.country" label="Country" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="recommender.faculty_biography_link"
                    label="Faculty biography link"
                    outlined
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="recommender.google_scholar_link"
                    label="Google Scholar link"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="recommender.relationship" label="How they know me" outlined />
                </div>
              </div>

              <q-input
                v-model="recommender.projects_discussed"
                label="Project numbers discussed in recommendation"
                outlined
              />

              <q-select
                v-model="recommender.cited_project"
                :options="['Yes', 'No']"
                label="Has the recommender cited your work?"
                outlined
                emit-value
                map-options
                :options-value="true"
                :options-label="'Yes'"
              />

              <template v-if="recommender.cited_project">
                <q-input
                  v-model="recommender.cited_project_number"
                  label="Project number from the summary of contributions they cited"
                  outlined
                />

                <q-input
                  v-model="recommender.citation_details"
                  label="Title and publication details of their citing paper"
                  type="textarea"
                  outlined
                />

                <q-input
                  v-model="recommender.explanation_of_use"
                  label="An explanation of how the recommender used your work"
                  type="textarea"
                  outlined
                />
              </template>

              <div class="row q-gutter-sm justify-end">
                <q-btn label="Cancel" flat @click="cancelEditing(recommender)" />
                <q-btn label="Save Changes" color="primary" type="submit" :loading="loading" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- New Recommender Form -->
    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="text-h6">Add New Recommender</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.name"
                label="Name of recommender"
                :rules="[(val) => !!val || 'Name is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.dependentOrIndependent"
                label="Dependent or Independent"
                outlined
                :readonly="isFinalized"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.titlePosition"
                label="Title/position"
                outlined
                :readonly="isFinalized"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.institution"
                label="Institution"
                outlined
                :readonly="isFinalized"
              />
            </div>
          </div>

          <q-input
            v-model="form.country"
            label="Country where the recommender is located"
            outlined
            :readonly="isFinalized"
          />

          <q-input
            v-model="form.facultyLink"
            label="Link to online faculty or company biography page"
            outlined
            :readonly="isFinalized"
          />

          <q-input
            v-model="form.scholarLink"
            label="Link to Google Scholar profile"
            outlined
            :readonly="isFinalized"
          />

          <q-card-section class="q-pa-none">
            <div class="text-subtitle1 q-mb-sm">How does this recommender know me?</div>
            <q-input v-model="form.howKnowMe" type="textarea" outlined :readonly="isFinalized" />
          </q-card-section>

          <div class="q-mt-md">
            <div class="text-subtitle1">
              Which project or projects (from your Summary of Contributions tab) can this
              recommender discuss in their recommendation letter?
            </div>
            <div class="text-caption">
              Please list this project number/these project numbers below.
            </div>
            <q-input
              v-model="form.projectNumbers"
              type="textarea"
              outlined
              :readonly="isFinalized"
            />
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle1">Has this recommender cited a project?</div>
            <q-radio v-model="form.hasCitedProject" val="Yes" label="Yes" :disable="isFinalized" />
            <q-radio v-model="form.hasCitedProject" val="No" label="No" :disable="isFinalized" />
          </div>

          <template v-if="form.hasCitedProject === 'Yes'">
            <q-input
              v-model="form.citedProjectNumber"
              label="Project number from the summary of contributions they cited"
              outlined
              :readonly="isFinalized"
            />

            <q-input
              v-model="form.citationDetails"
              label="Title and publication details of their citing paper"
              type="textarea"
              outlined
              :readonly="isFinalized"
            />

            <q-input
              v-model="form.explanationOfUse"
              label="An explanation of how the recommender used your work"
              type="textarea"
              outlined
              :readonly="isFinalized"
            />
          </template>

          <div class="row justify-end q-mt-md">
            <q-btn label="Submit" type="submit" color="primary" :loading="loading" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <div class="sticky-button-container">
      <q-btn
        label="Save Recommender"
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
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRecommendersStore } from 'src/stores/recommenders'
import { storeToRefs } from 'pinia'

export default {
  name: 'RecommendersPage',

  setup() {
    const $q = useQuasar()
    const store = useRecommendersStore()
    const { loading } = storeToRefs(store)
    const isFinalized = ref(false)
    const form = ref({
      name: '',
      dependentOrIndependent: '',
      titlePosition: '',
      institution: '',
      country: '',
      facultyLink: '',
      scholarLink: '',
      howKnowMe: '',
      projectNumbers: '',
      hasCitedProject: 'No',
      citedProjectNumber: '',
      citationDetails: '',
      explanationOfUse: '',
    })

    onMounted(async () => {
      await store.fetchRecommenders()
    })

    const onSubmit = async () => {
      console.log('onSubmit function called')
      // loading.value = true
      // try {
      //   const payload = {
      //     ...form.value,
      //     cited_project: form.value.hasCitedProject === 'Yes',
      //   }

      //   await store.addRecommender(payload)

      //   // Reset form after successful submission
      //   form.value = {
      //     name: '',
      //     institution: '',
      //     dependentOrIndependent: '',
      //     titlePosition: '',
      //     country: '',
      //     facultyLink: '',
      //     scholarLink: '',
      //     howKnowMe: '',
      //     projectNumbers: '',
      //     hasCitedProject: 'No',
      //     citedProjectNumber: '',
      //     citationDetails: '',
      //     explanationOfUse: '',
      //   }

      //   $q.notify({
      //     type: 'positive',
      //     message: 'Recommender added successfully!',
      //   })
      // } catch (error) {
      //   console.error('Error adding recommender:', error)
      //   $q.notify({
      //     type: 'negative',
      //     message: 'Failed to add recommender. Please try again.',
      //   })
      // } finally {
      //   loading.value = false
      // }
    }

    const startEditing = (recommender) => {
      // Convert boolean or number to yes/no before editing
      const convertedRecommender = {
        ...recommender,
        cited_project: convertToYesNo(recommender.cited_project),
      }

      convertedRecommender.isEditing = true
      // Create a backup of the original data in case of cancellation
      convertedRecommender._original = { ...convertedRecommender }

      // Update the recommender in the list
      const index = store.recommenders.findIndex((r) => r.id === recommender.id)
      if (index !== -1) {
        store.recommenders[index] = convertedRecommender
      }
    }

    // Helper function to convert boolean/number to yes/no
    const convertToYesNo = (value) => {
      if (typeof value === 'boolean') {
        return value ? 'yes' : 'no'
      }
      if (typeof value === 'number') {
        return value === 1 ? 'yes' : 'no'
      }
      return value // Return as is if it's already a string
    }

    const cancelEditing = (recommender) => {
      // Restore original data
      Object.assign(recommender, recommender._original)
      recommender.isEditing = false
      delete recommender._original
    }

    const updateRecommender = async (recommender) => {
      loading.value = true
      try {
        // Convert cited_project to boolean explicitly
        let citedProjectValue = false
        if (recommender.cited_project && recommender.cited_project.toLowerCase() === 'yes') {
          citedProjectValue = true
        }

        const payload = {
          name: recommender.name,
          dependent_or_independent: recommender.dependent_or_independent,
          title: recommender.title,
          institution: recommender.institution,
          country: recommender.country,
          faculty_biography_link: recommender.faculty_biography_link,
          google_scholar_link: recommender.google_scholar_link,
          relationship: recommender.relationship,
          projects_discussed: recommender.projects_discussed,
          cited_project: citedProjectValue, // Use the explicitly converted boolean
          cited_project_details: recommender.cited_project_details,
          status: recommender.status,
        }

        console.log('Updating recommender with payload:', payload) // Debug log

        await store.updateRecommender(recommender.id, payload)
        recommender.isEditing = false
        delete recommender._original

        $q.notify({
          type: 'positive',
          message: 'Recommender information updated successfully!',
        })
      } catch (error) {
        console.error(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to update recommender information. Please try again.',
        })
      } finally {
        loading.value = false
      }
    }

    return {
      isFinalized,
      form,
      onSubmit,
      loading,
      existingRecommenders: computed(() => store.recommenders),
      startEditing,
      cancelEditing,
      updateRecommender,
    }
  },
}
</script>

<style scoped>
.recommender-form {
  padding-bottom: 80px;
}

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

.q-card {
  transition: all 0.3s ease;
}

.q-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
