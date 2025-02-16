<template>
  <div class="publication-records-section q-pa-md">
    <q-card flat bordered>
      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="green" size="3em" />
        <div class="text-grey q-mt-md">Loading publication records...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="green" label="Retry" @click="fetchPublicationData" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="green"
          indicator-color="green"
          align="justify"
          narrow-indicator
        >
          <q-tab name="publications" label="Publications" icon="menu_book" />
          <q-tab name="academic" label="Academic Service" icon="school" />
          <q-tab name="research" label="Research Info" icon="science" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Publications Tab -->
          <q-tab-panel name="publications">
            <!-- Journal Publications -->
            <div class="section-container q-mb-xl">
              <div class="text-h6 q-mb-md text-green">Journal Publications</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.peer_reviewed_journal_articles"
                    label="Peer-Reviewed Journal Articles"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge
                        :color="getBadgeColor(publicationData.peer_reviewed_journal_articles)"
                      >
                        {{ publicationData.peer_reviewed_journal_articles || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_peer_reviewed_journal"
                    label="Notes on Journal Articles"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_peer_reviewed_journal)">
                        {{ formatValue(publicationData.notes_peer_reviewed_journal) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

            <!-- Conference Publications -->
            <div class="section-container q-mb-xl">
              <div class="text-h6 q-mb-md text-green">Conference Publications</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.peer_reviewed_conference_articles"
                    label="Peer-Reviewed Conference Articles"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge
                        :color="getBadgeColor(publicationData.peer_reviewed_conference_articles)"
                      >
                        {{ publicationData.peer_reviewed_conference_articles || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_peer_reviewed_conference"
                    label="Notes on Conference Articles"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge
                        :color="getBadgeColor(publicationData.notes_peer_reviewed_conference)"
                      >
                        {{ formatValue(publicationData.notes_peer_reviewed_conference) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.conference_abstracts"
                    label="Conference Abstracts"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.conference_abstracts)">
                        {{ publicationData.conference_abstracts || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_conference_abstracts"
                    label="Notes on Conference Abstracts"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_conference_abstracts)">
                        {{ formatValue(publicationData.notes_conference_abstracts) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

            <!-- Other Publications -->
            <div class="section-container q-mb-xl">
              <div class="text-h6 q-mb-md text-green">Other Publications</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.pre_prints"
                    label="Pre-prints"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.pre_prints)">
                        {{ publicationData.pre_prints || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.book_chapters"
                    label="Book Chapters"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.book_chapters)">
                        {{ publicationData.book_chapters || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_book_chapters"
                    label="Notes on Book Chapters"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_book_chapters)">
                        {{ formatValue(publicationData.notes_book_chapters) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.books"
                    label="Books"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.books)">
                        {{ publicationData.books || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_books"
                    label="Notes on Books"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_books)">
                        {{ formatValue(publicationData.notes_books) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.technical_reports"
                    label="Technical Reports"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.technical_reports)">
                        {{ publicationData.technical_reports || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_technical_reports"
                    label="Notes on Technical Reports"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_technical_reports)">
                        {{ formatValue(publicationData.notes_technical_reports) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.granted_patents"
                    label="Granted Patents"
                    outlined
                    dense
                    stack-label
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.granted_patents)">
                        {{ publicationData.granted_patents || 0 }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.notes_granted_patents"
                    label="Notes on Granted Patents"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.notes_granted_patents)">
                        {{ formatValue(publicationData.notes_granted_patents) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    readonly
                    :value="publicationData.others"
                    label="Others"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.others)">
                        {{ formatValue(publicationData.others) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    readonly
                    :value="publicationData.in_preparation_manuscripts"
                    label="Notes on Others"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(publicationData.in_preparation_manuscripts)">
                        {{ formatValue(publicationData.in_preparation_manuscripts) }}
                      </q-badge>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Academic Service Tab -->
          <q-tab-panel name="academic">
            <div class="text-h6 q-mb-md text-green">Academic Service</div>
            <div class="row q-col-gutter-md">
              <!-- Editor Role -->
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="publicationData.editor_role"
                  label="Editor Role"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="publicationData.editor_role === 'yes' ? 'positive' : 'grey'">
                      {{ formatValue(publicationData.editor_role) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Editor Journals -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.editor_journals"
                  label="Editor Journals"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                  autogrow
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.editor_journals)">
                      {{ formatValue(publicationData.editor_journals) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Number of Peer Reviews -->
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="publicationData.number_of_peer_reviews"
                  label="Number of Peer Reviews"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.number_of_peer_reviews)">
                      {{ publicationData.number_of_peer_reviews || 0 }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- PhD Committee -->
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="publicationData.served_on_phd_dissertation_committee"
                  label="Served on PhD Dissertation Committee"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge
                      :color="
                        publicationData.served_on_phd_dissertation_committee === 'yes'
                          ? 'positive'
                          : 'grey'
                      "
                    >
                      {{ formatValue(publicationData.served_on_phd_dissertation_committee) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Grant Applications -->
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="publicationData.performed_grant_application_for_government_agencies"
                  label="Performed Grant Applications"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge
                      :color="
                        publicationData.performed_grant_application_for_government_agencies ===
                        'yes'
                          ? 'positive'
                          : 'grey'
                      "
                    >
                      {{
                        formatValue(
                          publicationData.performed_grant_application_for_government_agencies,
                        )
                      }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Grant Application Agency -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.grant_application_agency"
                  label="Grant Application Agency"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                  autogrow
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.grant_application_agency)">
                      {{ formatValue(publicationData.grant_application_agency) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Research Info Tab -->
          <q-tab-panel name="research">
            <div class="text-h6 q-mb-md text-green">Research Information</div>
            <div class="row q-col-gutter-md">
              <!-- Research Topic -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.research_topic"
                  label="Research Topic"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                  autogrow
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.research_topic)">
                      {{ formatValue(publicationData.research_topic) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Citation Database Link -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.citation_database_link"
                  label="Citation Database Link"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.citation_database_link)">
                      {{ formatValue(publicationData.citation_database_link) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Significance -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.significance"
                  label="Research Significance"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                  autogrow
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.significance)">
                      {{ formatValue(publicationData.significance) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <!-- Funding Sources -->
              <div class="col-12">
                <q-input
                  readonly
                  :value="publicationData.funding_sources"
                  label="Funding Sources"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                  autogrow
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(publicationData.funding_sources)">
                      {{ formatValue(publicationData.funding_sources) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'PublicationRecordsSection',

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
    const publicationData = ref({})
    const activeTab = ref('publications')

    const formatValue = (value) => {
      return value || 'Not Provided'
    }

    const getBadgeColor = (value) => {
      return value ? 'primary' : 'grey-7'
    }

    const fetchPublicationData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/auth/cases/${props.caseId}/publication-records`)
        publicationData.value = response.data.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading publication records. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load publication records',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchPublicationData()
      }
    })

    return {
      loading,
      error,
      publicationData,
      activeTab,
      fetchPublicationData,
      formatValue,
      getBadgeColor,
    }
  },
}
</script>

<style lang="scss" scoped>
.publication-records-section {
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
