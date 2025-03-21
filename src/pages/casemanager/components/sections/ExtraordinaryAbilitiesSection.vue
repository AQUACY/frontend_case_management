<template>
  <div class="extraordinary-abilities-section q-pa-md">
    <q-card flat bordered>
      <!-- Loading State -->
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="green" size="3em" />
        <div class="text-grey q-mt-md">Loading extraordinary abilities evidence...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center q-pa-lg">
        <q-icon name="error" color="negative" size="3em" />
        <div class="text-negative q-mt-md">{{ error }}</div>
        <q-btn color="green" label="Retry" @click="fetchAbilitiesData" class="q-mt-md" />
      </div>

      <!-- Content -->
      <q-card-section v-else>
        <!-- Summary Badges -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-md text-center">
            <q-badge color="green" class="full-width q-pa-sm" v-if="abilitiesData.awards?.length">
              <q-icon name="emoji_events" class="q-mr-xs" />
              Has Awards
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Awards</q-badge>
          </div>
          <div class="col-12 col-md text-center">
            <q-badge
              color="green"
              class="full-width q-pa-sm"
              v-if="abilitiesData.memberships?.length"
            >
              <q-icon name="card_membership" class="q-mr-xs" />
              Has Memberships
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Memberships</q-badge>
          </div>
          <div class="col-12 col-md text-center">
            <q-badge
              color="green"
              class="full-width q-pa-sm"
              v-if="abilitiesData.media_coverages?.length"
            >
              <q-icon name="newspaper" class="q-mr-xs" />
              Has Media Coverage
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Media Coverage</q-badge>
          </div>
          <div class="col-12 col-md text-center">
            <q-badge
              color="green"
              class="full-width q-pa-sm"
              v-if="abilitiesData.speaking_engagements?.length"
            >
              <q-icon name="record_voice_over" class="q-mr-xs" />
              Has Speaking Engagements
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else
              >No Speaking Engagements</q-badge
            >
          </div>
          <div class="col-12 col-md text-center">
            <q-badge
              color="green"
              class="full-width q-pa-sm"
              v-if="abilitiesData.leadership_roles?.length"
            >
              <q-icon name="psychology" class="q-mr-xs" />
              Has Leadership Roles
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Leadership Roles</q-badge>
          </div>
        </div>

        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="green"
          indicator-color="green"
          align="justify"
          narrow-indicator
        >
          <q-tab name="awards" label="Awards" icon="emoji_events" />
          <q-tab name="memberships" label="Memberships" icon="card_membership" />
          <q-tab name="media" label="Media Coverage" icon="newspaper" />
          <q-tab name="speaking" label="Speaking" icon="record_voice_over" />
          <q-tab name="leadership" label="Leadership" icon="psychology" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Awards Panel -->
          <q-tab-panel name="awards">
            <div v-if="abilitiesData.awards && abilitiesData.awards.length > 0">
              <div v-for="award in abilitiesData.awards" :key="award.id" class="q-mb-md">
                <q-card bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Award Name</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(award.award_name)">
                                  {{ formatValue(award.award_name) }}
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
                              <q-item-label caption>Award Recipient</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(award.award_recipient)">
                                  {{ formatValue(award.award_recipient) }}
                                </q-badge>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <!-- Continue with other award fields -->
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div v-else class="text-center q-pa-md">
              <q-icon name="emoji_events" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No awards available</div>
            </div>
          </q-tab-panel>

          <!-- Memberships Panel -->
          <q-tab-panel name="memberships">
            <div v-if="abilitiesData.memberships && abilitiesData.memberships.length > 0">
              <div
                v-for="membership in abilitiesData.memberships"
                :key="membership.id"
                class="q-mb-md"
              >
                <q-card bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Membership Level</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(membership.membership_level)">
                                  {{ formatValue(membership.membership_level) }}
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
                              <q-item-label caption>Membership Requirements</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="membership.membership_requirements">
                                  <div
                                    v-for="(requirement, index) in formatCitations(
                                      membership.membership_requirements,
                                    )"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="requirement"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">
                                  No membership requirements provided
                                </div>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Fee and Subscription Details</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="membership.fee_and_subscription_details">
                                  <div
                                    v-for="(detail, index) in formatCitations(
                                      membership.fee_and_subscription_details,
                                    )"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="detail"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">No fee details provided</div>
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
              <q-icon name="card_membership" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No memberships available</div>
            </div>
          </q-tab-panel>

          <!-- Media Coverage Panel -->
          <q-tab-panel name="media">
            <div v-if="abilitiesData.media_coverages && abilitiesData.media_coverages.length > 0">
              <div v-for="media in abilitiesData.media_coverages" :key="media.id" class="q-mb-md">
                <q-card bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Media Name</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(media.media_name)">
                                  {{ formatValue(media.media_name) }}
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
                              <q-item-label caption>Date Published</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(media.date_published)">
                                  {{ formatDate(media.date_published) }}
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
                              <q-item-label caption>Author</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(media.author)">
                                  {{ formatValue(media.author) }}
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
                              <q-item-label caption>Outlet Name</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(media.outlet_name)">
                                  {{ formatValue(media.outlet_name) }}
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
                              <q-item-label caption>Circulation Count</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(media.circulation_count)">
                                  {{ media.circulation_count || 0 }}
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
                              <q-item-label caption>Article Summary</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="media.article_summary">
                                  <div
                                    v-for="(summary, index) in formatCitations(
                                      media.article_summary,
                                    )"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="summary"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">No article summary provided</div>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Work Relevance</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="media.work_relevance">
                                  <div
                                    v-for="(relevance, index) in formatCitations(
                                      media.work_relevance,
                                    )"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="relevance"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">No work relevance provided</div>
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
              <q-icon name="newspaper" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No media coverage available</div>
            </div>
          </q-tab-panel>

          <!-- Speaking Engagements Panel -->
          <q-tab-panel name="speaking">
            <div
              v-if="
                abilitiesData.speaking_engagements && abilitiesData.speaking_engagements.length > 0
              "
            >
              <div
                v-for="engagement in abilitiesData.speaking_engagements"
                :key="engagement.id"
                class="q-mb-md"
              >
                <q-card bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Conference Name</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(engagement.conference_name)">
                                  {{ formatValue(engagement.conference_name) }}
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
                              <q-item-label caption>Engagement Date</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(engagement.engagement_date)">
                                  {{ formatDate(engagement.engagement_date) }}
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
                              <q-item-label caption>Engagement Details</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="engagement.details">
                                  <div
                                    v-for="(detail, index) in formatCitations(engagement.details)"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="detail"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">
                                  No engagement details provided
                                </div>
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
              <q-icon name="record_voice_over" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No speaking engagements available</div>
            </div>
          </q-tab-panel>

          <!-- Leadership Roles Panel -->
          <q-tab-panel name="leadership">
            <div v-if="abilitiesData.leadership_roles && abilitiesData.leadership_roles.length > 0">
              <div v-for="role in abilitiesData.leadership_roles" :key="role.id" class="q-mb-md">
                <q-card bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Role Position</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(role.role_position)">
                                  {{ formatValue(role.role_position) }}
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
                              <q-item-label caption>Organization Name</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(role.organization_name)">
                                  {{ formatValue(role.organization_name) }}
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
                              <q-item-label caption>Service Start Date</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(role.service_start_date)">
                                  {{ formatDate(role.service_start_date) }}
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
                              <q-item-label caption>Service End Date</q-item-label>
                              <q-item-label>
                                <q-badge :color="getBadgeColor(role.service_end_date)">
                                  {{ formatDate(role.service_end_date) }}
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
                              <q-item-label caption>Organization Prestige</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="role.organization_prestige">
                                  <div
                                    v-for="(prestige, index) in formatCitations(
                                      role.organization_prestige,
                                    )"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="prestige"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">
                                  No organization prestige details provided
                                </div>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col-12">
                        <q-list bordered>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Role Summary</q-item-label>
                              <q-item-label class="publication-notes">
                                <template v-if="role.role_summary">
                                  <div
                                    v-for="(summary, index) in formatCitations(role.role_summary)"
                                    :key="index"
                                    class="citation-item"
                                  >
                                    <div class="citation-number">{{ index + 1 }}.</div>
                                    <div class="citation-text" v-html="summary"></div>
                                  </div>
                                </template>
                                <div v-else class="no-citations">No role summary provided</div>
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
              <q-icon name="psychology" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No leadership roles available</div>
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
  name: 'ExtraordinaryAbilitiesSection',

  props: {
    caseId: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar()
    const loading = ref(false)
    const error = ref(null)
    const abilitiesData = ref({})
    const activeTab = ref('awards')

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

    const formatCitations = (text) => {
      if (!text) return []

      // Split by line breaks or bullet points
      const citations = text.split(/[•\n]/).filter((citation) => citation.trim())

      // Clean and format each citation
      return citations.map((citation) => {
        return citation.trim()
      })
    }

    const fetchAbilitiesData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/auth/cases/${props.caseId}/extraordinary-ability`)
        abilitiesData.value = response.data.data
        console.log(abilitiesData.value)
      } catch (err) {
        console.error(err)
        error.value = 'Error loading extraordinary abilities data. Please try again.'
        $q.notify({
          type: 'negative',
          message: 'Failed to load extraordinary abilities data',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchAbilitiesData()
      }
    })

    return {
      loading,
      error,
      abilitiesData,
      activeTab,
      fetchAbilitiesData,
      formatValue,
      getBadgeColor,
      formatDate,
      formatCitations,
    }
  },
}
</script>

<style lang="scss" scoped>
.extraordinary-abilities-section {
  :deep(.q-field--readonly) {
    .q-field__native {
      color: $grey-8;
    }

    .q_field__label {
      color: $grey-7;
    }
  }

  .q-badge {
    font-size: 0.9em;
  }

  .publication-notes {
    max-height: none !important;
    padding: 16px !important;
    background-color: #fff !important;

    .citation-item {
      display: flex;
      margin-bottom: 20px;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #4caf50;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        transform: translateX(4px);
      }

      .citation-number {
        min-width: 28px;
        font-weight: 600;
        color: #4caf50;
      }

      .citation-text {
        flex: 1;
        line-height: 1.6;
      }
    }

    .no-citations {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 20px;
    }
  }
}
</style>
