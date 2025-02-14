<template>
  <div class="research-summary q-pa-md">
    <q-card flat bordered>
      <q-card-section class="bg-green text-white">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-sm">
            <q-btn icon="arrow_back" flat round @click="$router.back()" />
            <div class="text-h6">Research Summary</div>
          </div>
        </div>
      </q-card-section>

      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="green"
        indicator-color="green"
        align="justify"
        narrow-indicator
      >
        <q-tab name="overview" label="Research Overview" icon="science" />
        <q-tab name="projects" label="Research Projects" icon="assignment" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Research Overview Panel -->
        <q-tab-panel name="overview">
          <div class="text-h6 q-mb-md">Research Overview</div>
          <div v-if="researchData" class="row q-col-gutter-md">
            <!-- Field Description -->
            <div class="col-12">
              <q-card bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="psychology" class="q-mr-sm" />
                    Field of Research
                  </div>
                  <q-input
                    readonly
                    :value="researchData.field_description"
                    label="Field Description"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(researchData.field_description)">
                        {{ formatValue(researchData.field_description) }}
                      </q-badge>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </div>

            <!-- Expertise Description -->
            <div class="col-12">
              <q-card bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="engineering" class="q-mr-sm" />
                    Expertise & Specialization
                  </div>
                  <q-input
                    readonly
                    :value="researchData.expertise_description"
                    label="Expertise Description"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(researchData.expertise_description)">
                        {{ formatValue(researchData.expertise_description) }}
                      </q-badge>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </div>

            <!-- Work Impact -->
            <div class="col-12">
              <q-card bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="trending_up" class="q-mr-sm" />
                    Research Impact
                  </div>
                  <q-input
                    readonly
                    :value="researchData.work_impact"
                    label="Work Impact"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(researchData.work_impact)">
                        {{ formatValue(researchData.work_impact) }}
                      </q-badge>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div v-else class="text-center q-pa-md">
            <q-icon name="science_off" size="4em" color="grey-5" />
            <div class="text-grey q-mt-sm">No research overview available</div>
          </div>
        </q-tab-panel>

        <!-- Research Projects Panel -->
        <q-tab-panel name="projects">
          <div class="text-h6 q-mb-md">Research Projects</div>
          <div v-if="researchData && researchData.projects && researchData.projects.length > 0">
            <div
              v-for="(project, index) in researchData.projects"
              :key="project.id"
              class="q-mb-md"
            >
              <q-card bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="assignment" class="q-mr-sm" />
                    Project #{{ index + 1 }}
                  </div>
                  <q-input
                    readonly
                    :value="project.project_description"
                    label="Project Description"
                    type="textarea"
                    outlined
                    dense
                    stack-label
                    autogrow
                  >
                    <template #append>
                      <q-badge :color="getBadgeColor(project.project_description)">
                        {{ formatValue(project.project_description) }}
                      </q-badge>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div v-else class="text-center q-pa-md">
            <q-icon name="assignment_off" size="4em" color="grey-5" />
            <div class="text-grey q-mt-sm">No research projects available</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'

export default {
  name: 'ResearchSummary',

  setup() {
    const route = useRoute()
    const activeTab = ref('overview')
    const researchData = ref(null)
    const loading = ref(false)

    const formatValue = (value) => {
      return value || 'Not Provided'
    }

    const getBadgeColor = (value) => {
      return value ? 'primary' : 'grey-7'
    }

    const fetchResearchSummary = async () => {
      loading.value = true
      try {
        const response = await api.get(`/api/auth/cases/${route.params.id}/research-summary`)
        researchData.value = response.data.data
      } catch (error) {
        console.error('Error fetching research summary:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchResearchSummary()
    })

    return {
      activeTab,
      researchData,
      loading,
      formatValue,
      getBadgeColor
    }
  }
}
</script>

<style lang="scss" scoped>
.research-summary {
  .q-card {
    .q-card__section {
      &:not(:first-child) {
        padding-top: 20px;
      }
    }
  }
}
</style>
