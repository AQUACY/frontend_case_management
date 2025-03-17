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
            <div v-for="(education, index) in educationData" :key="education.id" class="col-12">
              <q-card bordered class="q-mb-md">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-md">
                    <q-icon name="school" class="q-mr-sm" />
                    Education #{{ index + 1 }}
                  </div>
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6">
                      <q-list bordered>
                        <q-item>
                          <q-item-section>
                            <q-item-label caption>University Name</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(education.university_name)">
                                {{ formatValue(education.university_name) }}
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
                            <q-item-label caption>Completion Year</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(education.completion_year)">
                                {{ formatValue(education.completion_year) }}
                              </q-badge>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
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
                      <q-list bordered>
                        <q-item>
                          <q-item-section>
                            <q-item-label caption>Employer Name</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.employer_name)">
                                {{ formatValue(experience.employer_name) }}
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
                            <q-item-label caption>Business Type</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.business_type)">
                                {{ formatValue(experience.business_type) }}
                              </q-badge>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Job Details -->
                    <div class="col-12 col-md-6">
                      <q-list bordered>
                        <q-item>
                          <q-item-section>
                            <q-item-label caption>Job Title</q-item-label>

                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.job_title)">
                                {{ formatValue(experience.job_title) }}
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
                            <q-item-label caption>Hours Worked</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.hours_worked)">
                                {{ formatValue(experience.hours_worked) }} hrs/week
                              </q-badge>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Dates -->
                    <div class="col-12 col-md-6">
                      <q-list bordered>
                        <q-item>
                          <q-item-section>
                            <q-item-label caption>Start Date</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.start_date)">
                                {{ formatDate(experience.start_date) }}
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
                            <q-item-label caption>End Date</q-item-label>
                            <q-item-label>
                              <q-badge :color="getBadgeColor(experience.end_date)">
                                {{ formatDate(experience.end_date) }}
                              </q-badge>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <!-- Address -->
                    <div class="col-12">
                      <q-card flat bordered>
                        <q-card-section>
                          <div class="text-subtitle2 q-mb-sm">Work Location</div>
                          <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                              <q-list bordered>
                                <q-item>
                                  <q-item-section>
                                    <q-item-label caption>Address Line 1</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.address_1)">
                                        {{ formatValue(experience.address_1) }}
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
                                    <q-item-label caption>Address Line 2</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.address_2)">
                                        {{ formatValue(experience.address_2) }}
                                      </q-badge>
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-list bordered>
                                <q-item>
                                  <q-item-section>
                                    <q-item-label caption>City</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.city)">
                                        {{ formatValue(experience.city) }}
                                      </q-badge>
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-list bordered>
                                <q-item>
                                  <q-item-section>
                                    <q-item-label caption>State</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.state)">
                                        {{ formatValue(experience.state) }}
                                      </q-badge>
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-list bordered>
                                <q-item>
                                  <q-item-section>
                                    <q-item-label caption>Country</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.country)">
                                        {{ formatValue(experience.country) }}
                                      </q-badge>
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-md-3">
                              <q-list bordered>
                                <q-item>
                                  <q-item-section>
                                    <q-item-label caption>Postal Code</q-item-label>
                                    <q-item-label>
                                      <q-badge :color="getBadgeColor(experience.postal_code)">
                                        {{ formatValue(experience.postal_code) }}
                                      </q-badge>
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>

                    <!-- Job Details -->
                    <div class="col-12">
                      <q-list bordered>
                        <q-item>
                          <q-item-section>
                            <q-item-label caption>Job Details</q-item-label>
                            <q-item-label class="scrollable-text">
                              <div v-html="formatValue(experience.job_details).replace(/•/g, '<br>•').replace(/\\n/g, '<br>')"></div>
                            </q-item-label>

                          </q-item-section>
                        </q-item>
                      </q-list>
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

<style lang="scss" scoped>
 .scrollable-text {
  max-height: 150px;
  overflow-y: auto;
  word-wrap: break-word;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

</style>
