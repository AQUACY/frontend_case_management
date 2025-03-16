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
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Peer-Reviewed Journal Articles</q-item-label>
                        <q-item-label>
                          <q-badge
                            :color="getBadgeColor(publicationData.peer_reviewed_journal_articles)"
                          >
                            {{ publicationData.peer_reviewed_journal_articles || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Journal Articles</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_peer_reviewed_journal) }}
                    </q-item-label>


                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>

            <!-- Conference Publications -->
            <div class="section-container q-mb-xl">
              <div class="text-h6 q-mb-md text-green">Conference Publications</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Peer-Reviewed Conference Articles</q-item-label>
                        <q-item-label>
                          <q-badge
                            :color="
                              getBadgeColor(publicationData.peer_reviewed_conference_articles)
                            "
                          >
                            {{ publicationData.peer_reviewed_conference_articles || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Conference Articles</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_peer_reviewed_conference) }}
                    </q-item-label>
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Conference Abstracts</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.conference_abstracts)">
                            {{ publicationData.conference_abstracts || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Conference Abstracts</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_conference_abstracts) }}
                    </q-item-label>
                  
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>

            <!-- Other Publications -->
            <div class="section-container q-mb-xl">
              <div class="text-h6 q-mb-md text-green">Other Publications</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Pre-prints</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.pre_prints)">
                            {{ publicationData.pre_prints || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Book Chapters</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.book_chapters)">
                            {{ publicationData.book_chapters || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Book Chapters</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_book_chapters) }}
                    </q-item-label>
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Books</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.books)">
                            {{ publicationData.books || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Books</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_books) }}
                    </q-item-label>
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Technical Reports</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.technical_reports)">
                            {{ publicationData.technical_reports || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Technical Reports</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_technical_reports) }}
                    </q-item-label>
                       
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Granted Patents</q-item-label>
                        <q-item-label>
                          <q-badge :color="getBadgeColor(publicationData.granted_patents)">
                            {{ publicationData.granted_patents || 0 }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Granted Patents</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.notes_granted_patents) }}
                    </q-item-label>
                        
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12 col-md-6">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Others</q-item-label>
                        <q-item-label class="text-wrap">
                          <q-badge :color="getBadgeColor(publicationData.others)">
                            {{ formatValue(publicationData.others) }}
                          </q-badge>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-12">
                  <q-list bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Notes on Others</q-item-label>
                        <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.in_preparation_manuscripts) }}
                    </q-item-label>
                        
                      </q-item-section>
                    </q-item>
                  </q-list>
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
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Editor Role</q-item-label>
                      <q-item-label>
                        <q-badge
                          :color="publicationData.editor_role === 'yes' ? 'positive' : 'grey'"
                        >
                          {{ formatValue(publicationData.editor_role) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Editor Journals -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Editor Journals</q-item-label>
                      <q-item-label class="scrollable-text">
                      {{ formatValue(publicationData.editor_journals) }}
                    </q-item-label>
                     
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Number of Peer Reviews -->
              <div class="col-12 col-md-6">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Number of Peer Reviews</q-item-label>
                      <q-item-label>
                        <q-badge :color="getBadgeColor(publicationData.number_of_peer_reviews)">
                          {{ publicationData.number_of_peer_reviews || 0 }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- PhD Committee -->
              <div class="col-12 col-md-6">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Served on PhD Dissertation Committee</q-item-label>
                      <q-item-label>
                        <q-badge
                          :color="
                            publicationData.served_on_phd_dissertation_committee === 'yes'
                              ? 'positive'
                              : 'grey'
                          "
                        >
                          {{ formatValue(publicationData.served_on_phd_dissertation_committee) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Grant Applications -->
              <div class="col-12 col-md-6">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Performed Grant Applications</q-item-label>
                      <q-item-label>
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
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Grant Application Agency -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Grant Application Agency</q-item-label>
                      <q-item-label class="text-wrap">
                        <q-badge :color="getBadgeColor(publicationData.grant_application_agency)">
                          {{ formatValue(publicationData.grant_application_agency) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <!-- Research Info Tab -->
          <q-tab-panel name="research">
            <div class="text-h6 q-mb-md text-green">Research Information</div>
            <div class="row q-col-gutter-md">
              <!-- Research Topic -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Research Topic</q-item-label>
                      <q-item-label class="text-wrap">
                        <q-badge :color="getBadgeColor(publicationData.research_topic)">
                          {{ formatValue(publicationData.research_topic) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Citation Database Link -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Citation Database Link</q-item-label>
                      <q-item-label>
                        <q-badge :color="getBadgeColor(publicationData.citation_database_link)">
                          {{ formatValue(publicationData.citation_database_link) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Significance -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Research Significance</q-item-label>
                      <q-item-label class="text-wrap">
                        <q-badge :color="getBadgeColor(publicationData.significance)">
                          {{ formatValue(publicationData.significance) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Funding Sources -->
              <div class="col-12">
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Funding Sources</q-item-label>
                      <q-item-label class="text-wrap">
                        <q-badge :color="getBadgeColor(publicationData.funding_sources)">
                          {{ formatValue(publicationData.funding_sources) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
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

  .scrollable-text {
  max-height: 200px; /* Set a maximum height for the label */
  overflow-y: auto;  /* Adds vertical scrollbar if the content overflows */
  word-wrap: break-word; /* Ensures that long words break to fit inside */
  overflow-wrap: break-word; /* Prevents overflow of long words or URLs */
  white-space: normal; /* Ensures text wraps to the next line */
  padding: 8px; /* Adds padding to avoid text touching edges */
  background-color: #f9f9f9; /* Optional: Gives a nice background to the label */
  border-radius: 4px; /* Optional: Adds rounded corners */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds subtle shadow for better aesthetics */
}









  
}
</style>
