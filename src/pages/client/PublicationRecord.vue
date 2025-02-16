<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md text-green">Publication Record</div>
        <p class="text-italic q-mb-md">
          Please complete this publication record before beginning your summary of contributions.
        </p>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <!-- Publications Section -->
        <q-card-section>
          <div class="text-subtitle1 text-primary q-mb-md">Publications</div>

          <!-- Peer-reviewed Journal Articles -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="form.peer_reviewed_journal_articles"
                type="number"
                label="Peer-reviewed Journal Articles"
                outlined
                min="0"
              />
            </div>
            <div class="col-12 col-md-8">
              <q-input
                v-model="form.notes_peer_reviewed_journal"
                type="textarea"
                label="Notes"
                outlined
                hint="List significant publications with citations"
              />
            </div>
          </div>

          <!-- Conference Articles -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="form.peer_reviewed_conference_articles"
                type="number"
                label="Peer-reviewed Conference Articles"
                outlined
                min="0"
              />
            </div>
            <div class="col-12 col-md-8">
              <q-input
                v-model="form.notes_peer_reviewed_conference"
                type="textarea"
                label="Notes"
                outlined
                hint="List major conference presentations"
              />
            </div>
          </div>

          <!-- Other Publication Types -->
          <div class="publication-types q-gutter-y-md">
            <!-- Conference Abstracts -->
            <publication-field
              v-model:count="form.conference_abstracts"
              v-model:notes="form.notes_conference_abstracts"
              label="Conference Abstracts"
            />

            <!-- Pre-prints -->
            <publication-field
              v-model:count="form.pre_prints"
              v-model:notes="form.notes_pre_prints"
              label="Pre-prints"
            />

            <!-- Books -->
            <publication-field
              v-model:count="form.books"
              v-model:notes="form.notes_books"
              label="Books"
            />

            <!-- Book Chapters -->
            <publication-field
              v-model:count="form.book_chapters"
              v-model:notes="form.notes_book_chapters"
              label="Book Chapters"
            />

            <!-- Technical Reports -->
            <publication-field
              v-model:count="form.technical_reports"
              v-model:notes="form.notes_technical_reports"
              label="Technical Reports"
            />

            <!-- Granted Patents -->
            <publication-field
              v-model:count="form.granted_patents"
              v-model:notes="form.notes_granted_patents"
              label="Granted Patents"
            />
          </div>
        </q-card-section>

        <!-- Editorial and Review Work -->
        <q-card-section>
          <div class="text-subtitle1 text-primary q-mb-md">Editorial and Review Work</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="form.editor_role"
                :options="['yes', 'no']"
                label="Have you served as an editor? *"
                outlined
                emit-value
                map-options
                :options-dense="true"
                options-cover
              />
            </div>
            <div class="col-12 col-md-6" v-if="form.editor_role === 'yes'">
              <q-input
                v-model="form.editor_journals"
                type="textarea"
                label="Journals"
                outlined
                hint="List journals where you serve as editor"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model.number="form.number_of_peer_reviews"
                type="number"
                label="Number of Peer Reviews"
                outlined
                min="0"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="form.served_on_phd_dissertation_committee"
                :options="['yes', 'no']"
                label="Have you served on PhD dissertation committees? *"
                outlined
                emit-value
                map-options
                :options-dense="true"
                options-cover
              />
            </div>
          </div>
        </q-card-section>

        <!-- Grant Applications -->
        <q-card-section>
          <div class="text-subtitle1 text-primary q-mb-md">Grant Applications</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="form.performed_grant_application_for_government_agencies"
                :options="['yes', 'no']"
                label="Have you performed grant applications for government agencies? *"
                outlined
                emit-value
                map-options
                :options-dense="true"
                options-cover
              />
            </div>
            <div
              class="col-12"
              v-if="form.performed_grant_application_for_government_agencies === 'yes'"
            >
              <q-input
                v-model="form.grant_application_agency"
                label="Grant Application Agencies"
                outlined
                hint="List agencies you've submitted grant applications to"
              />
            </div>
          </div>
        </q-card-section>

        <!-- Additional Information -->
        <q-card-section>
          <div class="text-subtitle1 text-primary q-mb-md">Additional Information</div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="form.citation_database_link"
                label="Citation Database Link"
                outlined
                hint="e.g., Google Scholar, ResearchGate, or ORCID profile"
              />
            </div>
            <div class="col-12">
              <q-input v-model="form.research_topic" label="Research Topic" outlined />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.significance"
                type="textarea"
                label="Research Significance"
                outlined
                hint="Explain the importance of your research"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.funding_sources"
                type="textarea"
                label="Funding Sources"
                outlined
                hint="List major funding sources for your research"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.others"
                type="textarea"
                label="Other Publications/Contributions"
                outlined
                hint="Any other relevant publications or contributions"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.in_preparation_manuscripts"
                type="textarea"
                label="Manuscripts in Preparation"
                outlined
                hint="List any manuscripts currently in preparation"
              />
            </div>
          </div>
        </q-card-section>

        <!-- Save Button -->
        <div class="sticky-button-container">
          <q-btn
            type="submit"
            color="primary"
            label="Save Publication Record"
            :loading="loading"
            class="full-width"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePublicationRecordsStore } from 'src/stores/publicationRecords'
import { useQuasar } from 'quasar'
import PublicationField from 'src/components/PublicationField.vue'

export default {
  name: 'PublicationRecord',

  components: {
    PublicationField,
  },

  setup() {
    const store = usePublicationRecordsStore()
    const $q = useQuasar()
    const loading = ref(false)

    const form = ref({
      peer_reviewed_journal_articles: 0,
      notes_peer_reviewed_journal: '',
      peer_reviewed_conference_articles: 0,
      notes_peer_reviewed_conference: '',
      conference_abstracts: 0,
      notes_conference_abstracts: '',
      pre_prints: 0,
      notes_pre_prints: '',
      book_chapters: 0,
      notes_book_chapters: '',
      books: 0,
      notes_books: '',
      technical_reports: 0,
      notes_technical_reports: '',
      granted_patents: 0,
      notes_granted_patents: '',
      others: '',
      in_preparation_manuscripts: '',
      research_topic: '',
      significance: '',
      funding_sources: '',
      citation_database_link: '',
      editor_role: null,
      editor_journals: '',
      number_of_peer_reviews: 0,
      served_on_phd_dissertation_committee: null,
      performed_grant_application_for_government_agencies: null,
      grant_application_agency: '',
    })

    const loadPublicationRecords = async () => {
      loading.value = true
      try {
        const data = await store.fetchPublicationRecords()
        console.log('Fetched data:', data) // Debug log
        if (data) {
          // Convert null values to appropriate defaults
          Object.keys(form.value).forEach((key) => {
            if (typeof form.value[key] === 'number') {
              form.value[key] = data[key] ?? 0
            } else if (
              [
                'editor_role',
                'served_on_phd_dissertation_committee',
                'performed_grant_application_for_government_agencies',
              ].includes(key)
            ) {
              form.value[key] = data[key] ?? null
            } else {
              form.value[key] = data[key] ?? ''
            }
          })
          console.log('Processed form data:', form.value) // Debug log
        }
      } catch (error) {
        console.error('Error loading publication records:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load publication records',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    const onSubmit = async () => {
      loading.value = true
      try {
        // Validate required enum fields
        if (
          !form.value.editor_role ||
          !form.value.served_on_phd_dissertation_committee ||
          !form.value.performed_grant_application_for_government_agencies
        ) {
          throw new Error('Please answer all required questions')
        }

        await store.savePublicationRecords(form.value)
        $q.notify({
          type: 'positive',
          message: 'Publication record saved successfully',
        })
      } catch (error) {
        console.error('Error saving publication records:', error)
        $q.notify({
          type: 'negative',
          message: error.message || 'Failed to save publication record',
        })
      } finally {
        loading.value = false
      }
    }

    // Ensure the data is loaded when the component is mounted
    onMounted(() => {
      console.log('Component mounted') // Debug log
      loadPublicationRecords()
    })

    return {
      form,
      loading,
      onSubmit,
    }
  },
}
</script>

<style>
.sticky-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  z-index: 900;
  padding: 0 20px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

.q-form {
  padding-bottom: 80px;
}
</style>
