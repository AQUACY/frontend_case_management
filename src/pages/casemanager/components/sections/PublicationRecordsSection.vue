<template>
  <div class="publication-records-section q-pa-md">
    <q-card flat bordered>
      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="primary" size="3em" />
        <div class="text-grey q-mt-md">Loading publication records...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="primary" label="Retry" @click="fetchPublicationData" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <!-- Journal Publications -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Journal Publications</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.peer_reviewed_journal_articles"
                label="Peer-Reviewed Journal Articles"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_peer_reviewed_journal"
                label="Notes on Journal Articles"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
          </div>
        </div>

        <!-- Conference Publications -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Conference Publications</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.peer_reviewed_conference_articles"
                label="Peer-Reviewed Conference Articles"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_peer_reviewed_conference"
                label="Notes on Conference Articles"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.conference_abstracts"
                label="Conference Abstracts"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_conference_abstracts"
                label="Notes on Conference Abstracts"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
          </div>
        </div>

        <!-- Other Publications -->
        <div class="section-container q-mb-xl">
          <div class="text-h6 q-mb-md">Other Publications</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.pre_prints"
                label="Pre-prints"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.book_chapters"
                label="Book Chapters"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_book_chapters"
                label="Notes on Book Chapters"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.books"
                label="Books"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_books"
                label="Notes on Books"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.technical_reports"
                label="Technical Reports"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_technical_reports"
                label="Notes on Technical Reports"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.granted_patents"
                label="Granted Patents"
                type="number"
                outlined
                dense
                stack-label
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.notes_granted_patents"
                label="Notes on Granted Patents"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                readonly
                v-model="publicationData.others"
                label="Others"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.in_preparation_manuscripts"
                label="Notes on Others"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
          </div>
        </div>

        <!-- Research Information -->
        <div class="section-container">
          <div class="text-h6 q-mb-md">Research Information</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.research_topic"
                label="Research Topic"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.significance"
                label="Research Significance"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
              />
            </div>
            <div class="col-12">
              <q-input
                readonly
                v-model="publicationData.funding_sources"
                label="Funding Sources"
                type="textarea"
                outlined
                dense
                stack-label
                autogrow
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
      fetchPublicationData,
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
