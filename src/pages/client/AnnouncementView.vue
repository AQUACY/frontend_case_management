<template>
  <q-page class="q-pa-lg">
    <div v-if="loading">
      <q-spinner size="50px" color="green" />
      <p>Loading announcement...</p>
    </div>

    <div v-else-if="error">
      <q-banner color="negative">
        <div class="text-h6">Error: {{ errorMessage }}</div>
      </q-banner>
    </div>
    <div v-else-if="announcement">
      <q-card v-for="view in announcement" :key="view.id" v-bind="view" class="q-ma-lg">
        <q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="row items-center justify-between">
              <div class="col">
                <div class="text-h5 text-positive">{{ view.title }}</div>
              </div>
              <div class="col-auto">
                <div class="text-overline text-right">{{ formatDate(view.created_at) }}</div>
              </div>
            </div>
            <div class="text-caption text-grey">--Announcement--</div>
            {{ view.content }}
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

// Define state
const announcement = ref(null)
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

// Function to fetch the announcement from the API
const fetchAnnouncement = async () => {
  try {
    // Send a GET request to fetch the announcement
    const response = await api.get('/api/auth/announcements') // Update with your actual API endpoint
    announcement.value = response.data // Store the response data into the state
  } catch (err) {
    error.value = true // Set error flag to true if the request fails
    errorMessage.value = err.message || 'Failed to fetch announcement.' // Capture error message
  } finally {
    loading.value = false // Set loading flag to false once data is fetched or error occurs
  }
}
// Format the date in a readable format
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}
// Fetch data when the component is mounted
onMounted(() => {
  fetchAnnouncement()
})
</script>
