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
            <q-badge color="green" class="full-width q-pa-sm" v-if="abilitiesData.has_awards">
              <q-icon name="emoji_events" class="q-mr-xs" />
              Has Awards
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Awards</q-badge>
          </div>
          <div class="col-12 col-md text-center">
            <q-badge color="green" class="full-width q-pa-sm" v-if="abilitiesData.has_memberships">
              <q-icon name="card_membership" class="q-mr-xs" />
              Has Memberships
            </q-badge>
            <q-badge color="grey" class="full-width q-pa-sm" v-else>No Memberships</q-badge>
          </div>
          <div class="col-12 col-md text-center">
            <q-badge
              color="green"
              class="full-width q-pa-sm"
              v-if="abilitiesData.has_media_coverage"
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
              v-if="abilitiesData.has_speaking_engagements"
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
              v-if="abilitiesData.has_leadership_roles"
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
                        <q-input
                          readonly
                          :value="award.award_name"
                          label="Award Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(award.award_name)">
                              {{ formatValue(award.award_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="award.award_recipient"
                          label="Award Recipient"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(award.award_recipient)">
                              {{ formatValue(award.award_recipient) }}
                            </q-badge>
                          </template>
                        </q-input>
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
                        <q-input
                          readonly
                          :value="membership.membership_level"
                          label="Membership Level"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(membership.membership_level)">
                              {{ formatValue(membership.membership_level) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="membership.membership_requirements"
                          label="Membership Requirements"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(membership.membership_requirements)">
                              {{ formatValue(membership.membership_requirements) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="membership.fee_and_subscription_details"
                          label="Fee and Subscription Details"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge
                              :color="getBadgeColor(membership.fee_and_subscription_details)"
                            >
                              {{ formatValue(membership.fee_and_subscription_details) }}
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
                        <q-input
                          readonly
                          :value="media.media_name"
                          label="Media Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.media_name)">
                              {{ formatValue(media.media_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="formatDate(media.date_published)"
                          label="Date Published"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.date_published)">
                              {{ formatDate(media.date_published) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="media.author"
                          label="Author"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.author)">
                              {{ formatValue(media.author) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="media.outlet_name"
                          label="Outlet Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.outlet_name)">
                              {{ formatValue(media.outlet_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="media.circulation_count"
                          label="Circulation Count"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.circulation_count)">
                              {{ media.circulation_count || 0 }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="media.article_summary"
                          label="Article Summary"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.article_summary)">
                              {{ formatValue(media.article_summary) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="media.work_relevance"
                          label="Work Relevance"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(media.work_relevance)">
                              {{ formatValue(media.work_relevance) }}
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
                        <q-input
                          readonly
                          :value="engagement.conference_name"
                          label="Conference Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(engagement.conference_name)">
                              {{ formatValue(engagement.conference_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="formatDate(engagement.engagement_date)"
                          label="Engagement Date"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(engagement.engagement_date)">
                              {{ formatDate(engagement.engagement_date) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="engagement.details"
                          label="Engagement Details"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(engagement.details)">
                              {{ formatValue(engagement.details) }}
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
                        <q-input
                          readonly
                          :value="role.role_position"
                          label="Role Position"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.role_position)">
                              {{ formatValue(role.role_position) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="role.organization_name"
                          label="Organization Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.organization_name)">
                              {{ formatValue(role.organization_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="formatDate(role.service_start_date)"
                          label="Service Start Date"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.service_start_date)">
                              {{ formatDate(role.service_start_date) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          readonly
                          :value="formatDate(role.service_end_date)"
                          label="Service End Date"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.service_end_date)">
                              {{ formatDate(role.service_end_date) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="role.organization_prestige"
                          label="Organization Prestige"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.organization_prestige)">
                              {{ formatValue(role.organization_prestige) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          readonly
                          :value="role.role_summary"
                          label="Role Summary"
                          type="textarea"
                          outlined
                          dense
                          stack-label
                          autogrow
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(role.role_summary)">
                              {{ formatValue(role.role_summary) }}
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

    .q-field__label {
      color: $grey-7;
    }
  }

  .q-badge {
    font-size: 0.9em;
  }
}
</style>
