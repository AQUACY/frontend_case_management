<template>
  <div class="summary-contributions q-pa-md">
    <q-card flat bordered>
      <q-card-section class="bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-sm">
            <q-btn icon="arrow_back" flat round @click="$router.back()" />
            <div class="text-h6">Summary of Contributions</div>
          </div>
        </div>
      </q-card-section>

      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="background" label="Background Information" />
        <q-tab name="contributions" label="Contributions" />
        <q-tab name="qualifications" label="Additional Qualifications" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Background Information Panel -->
        <q-tab-panel name="background">
          <background-info-tab :loading="loadingBackground" :background-data="backgroundData" />
        </q-tab-panel>

        <!-- Contributions Panel -->
        <q-tab-panel name="contributions">
          <contributions-tab
            :loading="loadingContributions"
            :contributions-data="contributionsData"
          />
        </q-tab-panel>

        <!-- Additional Qualifications Panel -->
        <q-tab-panel name="qualifications">
          <qualifications-tab
            :loading="loadingQualifications"
            :qualifications-data="qualificationsData"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import BackgroundInfoTab from './components/BackgroundInfoTab.vue'
import ContributionsTab from './components/ContributionsTab.vue'
import QualificationsTab from './components/QualificationsTab.vue'

export default {
  name: 'SummaryOfContributions',

  components: {
    BackgroundInfoTab,
    ContributionsTab,
    QualificationsTab,
  },

  setup() {
    const route = useRoute()
    const activeTab = ref('background')

    const loadingBackground = ref(false)
    const loadingContributions = ref(false)
    const loadingQualifications = ref(false)

    const backgroundData = ref(null)
    const contributionsData = ref([])
    const qualificationsData = ref(null)

    const fetchBackgroundInfo = async () => {
      loadingBackground.value = true
      try {
        const response = await api.get(`/api/auth/background-information/${route.params.id}`)
        backgroundData.value = response.data
      } catch (error) {
        console.error('Error fetching background info:', error)
      } finally {
        loadingBackground.value = false
      }
    }

    const fetchContributions = async () => {
      loadingContributions.value = true
      try {
        const response = await api.get(`/api/auth/case/contributions/${route.params.id}`)
        contributionsData.value = response.data
      } catch (error) {
        console.error('Error fetching contributions:', error)
      } finally {
        loadingContributions.value = false
      }
    }

    const fetchQualifications = async () => {
      loadingQualifications.value = true
      try {
        const response = await api.get(`/api/auth/additional-qualification/${route.params.id}`)
        qualificationsData.value = response.data
      } catch (error) {
        console.error('Error fetching qualifications:', error)
      } finally {
        loadingQualifications.value = false
      }
    }

    onMounted(() => {
      fetchBackgroundInfo()
      fetchContributions()
      fetchQualifications()
    })

    return {
      activeTab,
      loadingBackground,
      loadingContributions,
      loadingQualifications,
      backgroundData,
      contributionsData,
      qualificationsData,
    }
  },
}
</script>
