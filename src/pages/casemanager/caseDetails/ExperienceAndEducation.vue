<template>
  <div class="experience-education q-pa-md">
    <q-card flat bordered>
      <q-card-section class="bg-green text-white">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-sm">
            <q-btn icon="arrow_back" flat round @click="$router.back()" />
            <div class="text-h6">Experience & Education</div>
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
        <q-tab name="education" label="Education" icon="school" />
        <q-tab name="experience" label="Work Experience" icon="work_history" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Education Panel -->
        <q-tab-panel name="education">
          <div class="text-h6 q-mb-md">Education History</div>
          <div v-if="educationData" class="row q-col-gutter-md">
            <div
              v-for="(education, index) in educationData"
              :key="education.id"
              class="col-12"
            >
              <q-card bordered class="q-mb-md">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="school" class="q-mr-sm" />
                    Education #{{ index + 1 }}
                  </div>
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="education.university_name"
                        label="University Name"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(education.university_name)">
                            {{ formatValue(education.university_name) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="education.completion_year"
                        label="Completion Year"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(education.completion_year)">
                            {{ formatValue(education.completion_year) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div v-else class="text-center q-pa-md">
            <q-icon name="school" size="4em" color="grey-5" />
            <div class="text-grey q-mt-sm">No education history available</div>
          </div>
        </q-tab-panel>

        <!-- Work Experience Panel -->
        <q-tab-panel name="experience">
          <div class="text-h6 q-mb-md">Work Experience History</div>
          <div v-if="workExperienceData && workExperienceData.length > 0">
            <div
              v-for="(experience, index) in workExperienceData"
              :key="experience.id"
              class="q-mb-lg"
            >
              <q-card bordered>
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="business" class="q-mr-sm" />
                    Experience #{{ index + 1 }}
                  </div>
                  <div class="row q-col-gutter-md">
                    <!-- Company Information -->
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="experience.employer_name"
                        label="Employer Name"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.employer_name)">
                            {{ formatValue(experience.employer_name) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="experience.business_type"
                        label="Business Type"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.business_type)">
                            {{ formatValue(experience.business_type) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>

                    <!-- Job Details -->
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="experience.job_title"
                        label="Job Title"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.job_title)">
                            {{ formatValue(experience.job_title) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="experience.hours_worked"
                        label="Hours Worked"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.hours_worked)">
                            {{ formatValue(experience.hours_worked) }} hrs/week
                          </q-badge>
                        </template>
                      </q-input>
                    </div>

                    <!-- Dates -->
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="formatDate(experience.start_date)"
                        label="Start Date"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.start_date)">
                            {{ formatDate(experience.start_date) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-input
                        readonly
                        :value="formatDate(experience.end_date)"
                        label="End Date"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.end_date)">
                            {{ formatDate(experience.end_date) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>

                    <!-- Address -->
                    <div class="col-12">
                      <q-card flat bordered>
                        <q-card-section>
                          <div class="text-subtitle2 q-mb-sm">Work Location</div>
                          <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                              <q-input
                                readonly
                                :value="experience.address_1"
                                label="Address Line 1"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.address_1)">
                                    {{ formatValue(experience.address_1) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12 col-md-6">
                              <q-input
                                readonly
                                :value="experience.address_2"
                                label="Address Line 2"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.address_2)">
                                    {{ formatValue(experience.address_2) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-input
                                readonly
                                :value="experience.city"
                                label="City"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.city)">
                                    {{ formatValue(experience.city) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-input
                                readonly
                                :value="experience.state"
                                label="State"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.state)">
                                    {{ formatValue(experience.state) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-input
                                readonly
                                :value="experience.country"
                                label="Country"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.country)">
                                    {{ formatValue(experience.country) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-input
                                readonly
                                :value="experience.postal_code"
                                label="Postal Code"
                                outlined
                                dense
                                stack-label
                              >
                                <template #append>
                                  <q-badge :color="getBadgeColor(experience.postal_code)">
                                    {{ formatValue(experience.postal_code) }}
                                  </q-badge>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>

                    <!-- Job Details -->
                    <div class="col-12">
                      <q-input
                        readonly
                        :value="experience.job_details"
                        label="Job Details"
                        type="textarea"
                        outlined
                        dense
                        stack-label
                      >
                        <template #append>
                          <q-badge :color="getBadgeColor(experience.job_details)">
                            {{ formatValue(experience.job_details) }}
                          </q-badge>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div v-else class="text-center q-pa-md">
            <q-icon name="work_off" size="4em" color="grey-5" />
            <div class="text-grey q-mt-sm">No work experience available</div>
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
  name: 'ExperienceAndEducation',

  setup() {
    const route = useRoute()
    const activeTab = ref('education')
    const educationData = ref(null)
    const workExperienceData = ref([])
    const loading = ref(false)

    const formatValue = (value) => {
      return value || 'Not Provided'
    }

    const getBadgeColor = (value) => {
      return value ? 'primary' : 'grey-7'
    }

    const formatDate = (date) => {
      if (!date) return 'Not Provided'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const fetchEducation = async () => {
      try {
        const response = await api.get(`/api/auth/cases/${route.params.id}/education`)
        educationData.value = response.data.data
      } catch (error) {
        console.error('Error fetching education:', error)
      }
    }

    const fetchWorkExperience = async () => {
      try {
        const response = await api.get(`/api/auth/cases/${route.params.id}/work-experience`)
        workExperienceData.value = response.data.data
      } catch (error) {
        console.error('Error fetching work experience:', error)
      }
    }

    onMounted(() => {
      fetchEducation()
      fetchWorkExperience()
    })

    return {
      activeTab,
      educationData,
      workExperienceData,
      loading,
      formatValue,
      getBadgeColor,
      formatDate,
    }
  },
}
</script>
