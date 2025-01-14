<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Publication Record</div>

    <p class="text-italic q-mb-md">
      Please complete this publication record before you begin your summary of contributions, as it
      will be most helpful if we can refer to this completed publication record during our review of
      your summary of contributions draft.
    </p>

    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <!-- Peer-reviewed Journal Articles -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.peer_reviewed_journal_articles"
            type="number"
            label="Peer-reviewed Journal Articles"
            outlined
          />
        </div>
        <div class="col-12 col-md-8">
          <q-input
            v-model="form.notes_peer_reviewed_journal"
            type="textarea"
            label="Notes"
            outlined
          />
        </div>
      </div>

      <!-- Conference Articles -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.peer_reviewed_conference_articles"
            type="number"
            label="Peer-reviewed Conference Articles"
            outlined
          />
        </div>
        <div class="col-12 col-md-8">
          <q-input
            v-model="form.notes_peer_reviewed_conference"
            type="textarea"
            label="Notes"
            outlined
          />
        </div>
      </div>

      <!-- Conference Abstracts -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.conference_abstracts"
            type="number"
            label="Conference Abstracts"
            outlined
          />
        </div>
        <div class="col-12 col-md-8">
          <q-input
            v-model="form.notes_conference_abstracts"
            type="textarea"
            label="Notes"
            outlined
          />
        </div>
      </div>

      <!-- Additional Fields -->
      <!-- Pre-prints -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input v-model="form.pre_prints" type="number" label="Pre-prints" outlined />
        </div>
        <div class="col-12 col-md-8">
          <q-input v-model="form.notes_pre_prints" type="textarea" label="Notes" outlined />
        </div>
      </div>

      <!-- Book Chapters -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input v-model="form.book_chapters" type="number" label="Book Chapters" outlined />
        </div>
        <div class="col-12 col-md-8">
          <q-input v-model="form.notes_book_chapters" type="textarea" label="Notes" outlined />
        </div>
      </div>

      <!-- Books -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input v-model="form.books" type="number" label="Books" outlined />
        </div>
        <div class="col-12 col-md-8">
          <q-input v-model="form.notes_books" type="textarea" label="Notes" outlined />
        </div>
      </div>
      <!-- Technical Reports -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="form.technical_reports"
            type="number"
            label="Technical Reports"
            outlined
          />
        </div>
        <div class="col-12 col-md-8">
          <q-input v-model="form.notes_technical_reports" type="textarea" label="Notes" outlined />
        </div>
      </div>

      <!-- Granted Patents -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input v-model="form.granted_patents" type="number" label="Granted Patents" outlined />
        </div>
        <div class="col-12 col-md-8">
          <q-input v-model="form.notes_granted_patents" type="textarea" label="Notes" outlined />
        </div>
      </div>

      <!-- Others -->
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            v-model="form.others"
            type="textarea"
            label="Other Publications/Contributions"
            outlined
          />
        </div>
      </div>

      <!-- In Preparation Manuscripts -->
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            v-model="form.in_preparation_manuscripts"
            type="textarea"
            label="Manuscripts in Preparation"
            outlined
          />
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input v-model="form.research_topic" label="Research Topic" outlined />
        </div>
        <div class="col-12">
          <q-input v-model="form.significance" type="textarea" label="Significance" outlined />
        </div>
        <div class="col-12">
          <q-input
            v-model="form.funding_sources"
            type="textarea"
            label="Funding Sources"
            outlined
          />
        </div>
      </div>

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
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePublicationRecordsStore } from 'src/stores/publicationRecords'
import { useQuasar } from 'quasar'

export default {
  name: 'PublicationRecord',

  setup() {
    const store = usePublicationRecordsStore()
    const $q = useQuasar()
    const loading = ref(false)

    const form = ref({
      peer_reviewed_journal_articles: '',
      notes_peer_reviewed_journal: '',
      peer_reviewed_conference_articles: '',
      notes_peer_reviewed_conference: '',
      conference_abstracts: '',
      notes_conference_abstracts: '',
      pre_prints: '',
      notes_pre_prints: '',
      book_chapters: '',
      notes_book_chapters: '',
      books: '',
      notes_books: '',
      technical_reports: '',
      notes_technical_reports: '',
      granted_patents: '',
      notes_granted_patents: '',
      others: '',
      in_preparation_manuscripts: '',
      research_topic: '',
      significance: '',
      funding_sources: '',
    })

    // Load existing data when component mounts
    onMounted(async () => {
      loading.value = true
      try {
        console.log('Fetching publication records...')
        const data = await store.fetchPublicationRecords()
        console.log('Received data:', data)

        if (data) {
          // Handle potential nested data structure
          const recordData = data.data || data

          // Populate form with received data, converting null values to empty strings
          Object.keys(form.value).forEach((key) => {
            form.value[key] = recordData[key] ?? ''
          })

          console.log('Updated form data:', form.value)
        }
      } catch (error) {
        console.error('Error loading publication records:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load publication records',
        })
      } finally {
        loading.value = false
      }
    })

    const onSubmit = async () => {
      loading.value = true
      try {
        const payload = store.formatPublicationPayload(form.value)
        console.log('Submitting payload:', payload)
        await store.savePublicationRecords(payload)

        // Refresh the data after saving
        const updatedData = await store.fetchPublicationRecords()
        if (updatedData) {
          const recordData = updatedData.data || updatedData
          Object.keys(form.value).forEach((key) => {
            form.value[key] = recordData[key] ?? ''
          })
        }

        $q.notify({
          type: 'positive',
          message: 'Publication record saved successfully',
        })
      } catch (error) {
        console.error('Error saving publication records:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save publication record',
        })
      } finally {
        loading.value = false
      }
    }

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
  /* z-index: 1000; */
  padding: 0 20px;
}
</style>
