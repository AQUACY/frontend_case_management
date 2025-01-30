<template>
  <div class="additional-qualification-form">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Awards Section -->
      <div class="section q-mb-xl">
        <div class="row items-center q-mb-md">
          <q-checkbox
            v-model="formData.nationally_internationally_recognized_awards"
            label="I have a nationally or internationally-recognized awards to include"
          />
        </div>

        <template v-if="formData.nationally_internationally_recognized_awards">
          <div v-for="n in 3" :key="`award-${n}`" class="q-pa-md bg-grey-1 rounded-borders q-mb-md">
            <div class="text-subtitle1 q-mb-sm">Award {{ n }}</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input
                  v-model="formData[`award_${n}_name`]"
                  :label="`Award Name`"
                  outlined
                  dense
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="formData[`award_${n}_recipient`]"
                  :label="`Recipient`"
                  outlined
                  dense
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="formData[`award_${n}_institution`]"
                  :label="`Institution`"
                  outlined
                  dense
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData[`who_is_eligible_to_compete_${n}`]"
                  :label="`Who is Eligible to Compete`"
                  outlined
                  dense
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData[`number_of_competitors_winners_${n}`]"
                  :label="`Number of Competitors/Winners`"
                  type="number"
                  outlined
                  dense
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="formData[`selection_criteria_${n}`]"
                  :label="`Selection Criteria`"
                  type="textarea"
                  outlined
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="formData[`who_are_judges_${n}`]"
                  :label="`Who are the Judges`"
                  type="textarea"
                  outlined
                />
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Other Qualifications -->
      <div class="section q-mb-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-checkbox
              v-model="formData.peer_review"
              label="I do not have any peer review to include"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-checkbox
              v-model="formData.phd_committee"
              label="Have you served on a Ph.D. dissertation committee?"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-checkbox
              v-model="formData.grant_review"
              label="Have you performed grant application reviews for governmental agencies?"
            />
          </div>
        </div>
      </div>

      <!-- Leadership Roles -->
      <div class="section q-mb-xl" v-if="formData.leadership_roles">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-checkbox v-model="formData.leadership_roles" label="Leadership Roles" />
          </div>
          <template v-if="formData.leadership_roles">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.name_of_leadership_roles"
                label="Name of Leadership Role"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.name_of_organization_in_leadership"
                label="Organization Name"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.date_of_service"
                label="Date of Service"
                type="date"
                outlined
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Notable Memberships -->
      <div class="section q-mb-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-checkbox v-model="formData.notable_memberships" label="Notable Memberships" />
          </div>
          <template v-if="formData.notable_memberships">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.name_of_organization_in_membership"
                label="Name of Organization"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.level_of_membership"
                label="Level of Membership"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.requirements_for_membership"
                label="Requirement for Membership"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.who_judges_membership_eligibility"
                label="Who Judges Membership Eligibility"
                outlined
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Notable Media Coverage -->
      <div class="section q-mb-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-checkbox v-model="formData.notable_media_coverage" label="Notable Media Coverage" />
          </div>
          <template v-if="formData.notable_media_coverage">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.title_of_article" label="Title of Article" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.date_published"
                label="Date Published"
                type="date"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="formData.author" label="Author" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.magazine_newspaper_website"
                label="Name of Magazine/Newspaper/Website/Outlet"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.circulation"
                label="Circulation/Number of People who Read the Publication"
                type="number"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="formData.summary_of_article_focus"
                label="Summary of Article’s Focus"
                type="textarea"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="formData.relevance_to_original_work"
                label="Relevance to Your Original Work:"
                outlined
                type="textarea"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Invitations -->
      <div class="section q-mb-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-checkbox v-model="formData.invitations" label="Invitations to Present Research" />
          </div>
          <template v-if="formData.invitations">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.conference_title_1" label="Title of Conference" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.conference_month_year_1"
                label="Month and Year"
                type="date"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="formData.details_of_invitation_1"
                label="Details"
                type="textarea"
                outlined
              />
            </div>

            <!-- 2 -->
            <div class="col-12 text-caption q-pt-md">2.</div>
            <div class="col-12 col-md-6">
              <q-input v-model="formData.conference_title_2" label="Title of Conference" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.conference_month_year_2"
                label="Month and Year"
                type="date"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="formData.details_of_invitation_2"
                label="Details"
                type="textarea"
                outlined
              />
            </div>
          </template>
        </div>
      </div>

      <!-- EB-1A Filing -->
      <div class="section q-mb-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-checkbox v-model="formData.filing_eb1a" label="Are you filing for EB-1A?" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox
              v-model="formData.no_achievement_for_eb1a"
              label="No achievement for EB-1A"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="row justify-end q-mt-lg">
        <q-btn type="submit" color="green" label="Save" :loading="store.isLoading" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAdditionalQualificationStore } from 'src/stores/additionalQualification'

export default {
  name: 'AdditionalQualificationForm',

  setup() {
    const $q = useQuasar()
    const store = useAdditionalQualificationStore()

    const formData = ref({
      nationally_internationally_recognized_awards: false,
      peer_review: false,
      phd_committee: false,
      grant_review: false,
      leadership_roles: false,
      notable_memberships: false,
      notable_media_coverage: false,
      invitations: false,
      filing_eb1a: false,
      no_achievement_for_eb1a: false,
      // ... other fields with default values
    })

    const onSubmit = async () => {
      try {
        await store.saveQualification(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Additional qualifications saved successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to save additional qualifications',
        })
      }
    }

    onMounted(async () => {
      try {
        const data = await store.fetchQualification()
        if (data) {
          formData.value = { ...formData.value, ...data }
        }
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to load additional qualifications',
        })
      }
    })

    return {
      store,
      formData,
      onSubmit,
    }
  },
}
</script>

<style scoped>
.section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 2rem;
}
</style>
