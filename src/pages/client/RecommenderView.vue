<template>
  <q-page padding>
    <div class="text-h5 text-green q-mb-lg">Referrers</div>
    <div class="q-pa-md bg-grey-1 rounded-borders">
      <div class="text-subtitle1 q-mb-md text-bold">Key Principles for Selecting Referrers</div>
      <div class="">
        <p>
          To strengthen your immigration petition, carefully distinguish between independent and
        dependent recommenders and adhere to case-specific requirements.
        </p>

      </div>
      <div class="q-mb-md">
        <div class="text-weight-medium q-mb-sm">Independent vs Dependent Referrers:</div>
        <span class="text-bold"> 1. Independent Referrers:</span> <br /><br />

        <p>
         Definition: Experts with no prior professional, academic, or personal ties to you.
        </p>
        <ul>
          <li>Includes researchers who cited your work but never collaborated, or
            scholars familiar with your contributions through conferences/publications.</li>
          <li>Avoid individuals from the same institution/organization during overlapping
              tenure, as immigration officers may still deem them &quot;dependent&quot; after
              reviewing CVs.
            </li>
        </ul>
        <p>
          <span class="text-bold">Best Practice:</span> Prioritize unaffiliated experts (especially U.S.-based) to enhance
          credibility.
        </p>

        <!-- dependent referrers -->
            <span class="text-bold"> 2. Dependent Referrers:</span> <br />
            <ul>
              <li>Definition: Individuals with direct professional relationships (e.g.,
                supervisors, thesis advisors, collaborators).</li>
              <li>Caution: Government-affiliated experts (e.g., federal researchers) may
                face institutional policies restricting endorsement of immigration petitions.
                </li>
            </ul>
            <p>
              <span class="text-bold">Best Practice:</span> Prioritize unaffiliated experts (especially U.S.-based) to enhance
              credibility.
            </p>
      </div><br />

      <div class="q-mb-md">
        <div class="q-mb-sm text-bold">
          Case-Specific Referrer Guidelines
        </div>
        <span class="text-bold"> For NIW (Standard Preparation):</span>
        <ul class="q-mb-md">
          <li>
            <b>Dependent Referrers:</b> 1–2 (e.g., former supervisors).
          </li>
          <li><b>Independent Referrers:</b> 2–3 (at least 1 U.S.-based).</li>
          <li><b>Focus:</b> Senior figures in your field (professors, established researchers).</li>
          <li><b>Exclude:</b> Students; postdocs/fellows unless critical.</li>
        </ul>
      </div>

      <div class="q-mb-md">
        <div class="text-bold q-mb-sm">
          For EB1A/EB1B:
        </div>
        <ul class="q-mb-md">
          <li><b>Independent Referrers:</b> 4–5.</li>
          <li><b>Prioritize:</b> Experts who cited your work or hold international recognition.</li>
          <li><b>Geographic Mix:</b> Include 1 U.S.-based (required for O1) and 1–2 international
            referrers.</li>
          <li><b>Exclude:</b> Students, postdocs, and fellows.</li>
        </ul>
      </div>

      <div class="q-mb-md">
        <div class="text-bold q-mb-sm">
          For 4-Letter Cases (NIW/EB1A/EB1B):
        </div>
        <ul class="q-mb-md">
          <li><b>Dependent Referrers:</b> 2–3.</li>
          <li><b>Independent Referrers:</b> 4–5.</li>
          <li><b>NIW:</b> Aim for 2–3 U.S.-based independent referrers.</li>
          <li><b>EB1A/EB1B:</b> Blend international and U.S. experts.</li>
          <li><b>Exclude:</b> Early-career researchers (students/postdocs) except for NIW if
            unavoidable.</li>
        </ul>
      </div>


      <div class="q-mb-md">
        <div class="text-bold q-mb-sm">
          Critical Considerations
        </div>
        <ul class="q-mb-md">
          <li><b>Independence Verification:</b> Officers may scrutinize shared affiliations (e.g.,
            overlapping institutions) to assess bias.</li>
          <li><b>Citations Matter:</b> For EB1A/EB1B, prioritize referrers familiar with your work
            through citations or academic engagement.</li>
          <li><b>Avoid Red Flags:</b>Exclude recommendations from subordinates (e.g., students)
            or individuals with restricted endorsement authority (certain government roles).</li>
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
              <div class="text-h6 text-green">Referrer {{ index + 1 }}</div>
              <div>
                <q-btn
                  v-if="!recommender.isEditing && recommender.status === 'pending'"
                  flat
                  round
                  color="green"
                  icon="edit"
                  @click="startEditing(recommender)"
                />
                <q-btn
                  v-if="recommender.status === 'finalized'"
                  flat
                  round
                  color="red"
                  icon="lock"
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
                <div class="text-weight-medium">How does this referrer know me?:</div>
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
                  <q-input
                    v-model="recommender.relationship"
                    label="How does this referrer know me?"
                    outlined
                  />
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
        <div class="text-h6 text-green">Add New Referrer</div>
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
                class="q-pa-md"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.dependent_or_independent"
                label="Dependent or Independent"
                outlined
                :readonly="isFinalized"
                class="q-pa-md"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.title"
                label="Title/position"
                outlined
                :readonly="isFinalized"
                class="q-pa-md"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.institution"
                label="Institution"
                outlined
                :readonly="isFinalized"
                class="q-pa-md"
              />
            </div>
          </div>

          <q-input
            v-model="form.country"
            label="Country where the recommender is located"
            outlined
            :readonly="isFinalized"
            class="q-pa-md"
          />

          <q-input
            v-model="form.faculty_biography_link"
            label="Link to online faculty or company biography page"
            outlined
            :readonly="isFinalized"
            class="q-pa-md"
          />

          <q-input
            v-model="form.google_scholar_link"
            label="Link to Google Scholar profile"
            outlined
            :readonly="isFinalized"
            class="q-pa-md"
          />

          <q-card-section class="q-pa-none">
            <div class="text-subtitle1 q-mb-sm">How does this recommender know me?</div>
            <q-input
              v-model="form.relationship"
              type="textarea"
              outlined
              :readonly="isFinalized"
              class="q-pa-md"
            />
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
              v-model="form.projects_discussed"
              type="textarea"
              outlined
              :readonly="isFinalized"
              class="q-pa-md"
            />
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle1">Has this recommender cited a project?</div>
            <q-radio
              v-model="form.cited_project"
              val="Yes"
              label="Yes"
              :disable="isFinalized"
              class="q-pa-md"
            />
            <q-radio
              v-model="form.cited_project"
              val="No"
              label="No"
              :disable="isFinalized"
              class="q-pa-md"
            />
          </div>

          <template v-if="form.cited_project === 'Yes'">
            <q-input
              v-model="form.cited_project_number"
              label="Project number from the summary of contributions they cited"
              outlined
              :readonly="isFinalized"
              class="q-pa-md"
            />

            <q-input
              v-model="form.cited_project_details"
              label="Title and publication details of their citing paper"
              type="textarea"
              outlined
              :readonly="isFinalized"
              class="q-pa-md"
            />

            <q-input
              v-model="form.explanationOfUse"
              label="An explanation of how the recommender used your work"
              type="textarea"
              outlined
              :readonly="isFinalized"
              class="q-pa-md"
            />
          </template>

          <div class="sticky-button-container">
            <q-btn
              label="Save Referrer"
              color="green-10"
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
        </q-form>
      </q-card-section>
    </q-card>
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
      dependent_or_independent: '',
      title: '',
      institution: '',
      country: '',
      faculty_biography_link: '',
      google_scholar_link: '',
      relationship: '',
      projects_discussed: '',
      cited_project: 'No',
      cited_project_number: '',
      cited_project_details: '',
      explanationOfUse: '',
    })

    onMounted(async () => {
      await store.fetchRecommenders()
    })

    const onSubmit = async () => {
      console.log('onSubmit function called')
      loading.value = true
      try {
        const payload = {
          ...form.value,
          cited_project: form.value.cited_project === 'Yes',
        }

        const response = await store.addRecommender(payload)
        console.log('thi si functino log', response)
        // Check if the response indicates success
        if (response) {
          // Reset form after successful submission
          form.value = {
            name: '',
            dependent_or_independent: '',
            title: '',
            institution: '',
            country: '',
            faculty_biography_link: '',
            google_scholar_link: '',
            relationship: '',
            projects_discussed: '',
            cited_project: 'No',
            cited_project_number: '',
            cited_project_details: '',
            explanationOfUse: '',
          }

          $q.notify({
            type: 'positive',
            message: 'Recommender added successfully!',
          })
        } else {
          throw new Error('Failed to add recommender')
        }
      } catch (error) {
        console.error('Error adding recommender:', error)
        $q.notify({
          type: 'negative',
          message: `Failed to add recommender. Please try again. ${error || ''}`,
        })
      } finally {
        loading.value = false
      }
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
