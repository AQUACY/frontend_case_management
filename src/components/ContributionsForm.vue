<template>
  <div class="contributions-list">
    <!-- List of Contributions -->
    <div class="text-h6 q-mb-md">List of Contributions</div>

    <div class="row q-col-gutter-md">
      <div v-for="contribution in store.getContributions" :key="contribution.id" class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-start justify-between">
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">
                  {{ contribution.title_of_project }}
                </div>
                <div class="text-caption q-mt-sm">
                  {{ formatDate(contribution.date_of_initiation_from) }} -
                  {{ formatDate(contribution.date_of_initiation_to) }}
                </div>
                <div class="text-body2 q-mt-md">{{ contribution.summary_of_work }}</div>

                <!-- Publications -->
                <div v-if="contribution.resulting_publications_1" class="q-mt-md">
                  <div class="text-weight-medium">Publications:</div>
                  <ul class="q-mt-xs">
                    <li v-if="contribution.resulting_publications_1">
                      {{ contribution.resulting_publications_1 }}
                    </li>
                    <li v-if="contribution.resulting_publications_2">
                      {{ contribution.resulting_publications_2 }}
                    </li>
                    <li v-if="contribution.resulting_publications_3">
                      {{ contribution.resulting_publications_3 }}
                    </li>
                  </ul>
                </div>

                <!-- Funding Sources -->
                <div v-if="contribution.funding_sources_1" class="q-mt-md">
                  <div class="text-weight-medium">Funding Sources:</div>
                  <ul class="q-mt-xs">
                    <li v-if="contribution.funding_sources_1">
                      {{ contribution.funding_sources_1 }}
                    </li>
                    <li v-if="contribution.funding_sources_2">
                      {{ contribution.funding_sources_2 }}
                    </li>
                    <li v-if="contribution.funding_sources_3">
                      {{ contribution.funding_sources_3 }}
                    </li>
                  </ul>
                </div>

                <!-- NIW Project Description -->
                <div v-if="contribution.niw_project_description" class="q-mt-md">
                  <div class="text-weight-medium">NIW Project Description:</div>
                  <div class="q-mt-xs">{{ contribution.niw_project_description }}</div>
                </div>

                <!-- Alignment -->
                <div class="q-mt-md">
                  <div class="text-weight-medium">Alignment with Section I:</div>
                  <div class="q-mt-xs">{{ contribution.alignment_with_section_i }}</div>
                </div>

                <!-- Citations -->
                <div v-if="contribution.citation_1" class="q-mt-md">
                  <div class="text-weight-medium">Citations:</div>
                  <ul class="q-mt-xs">
                    <li v-if="contribution.citation_1">{{ contribution.citation_1 }}</li>
                    <li v-if="contribution.citation_2">{{ contribution.citation_2 }}</li>
                    <li v-if="contribution.citation_3">{{ contribution.citation_3 }}</li>
                    <li v-if="contribution.citation_4">{{ contribution.citation_4 }}</li>
                  </ul>
                </div>

                <!-- Status Badge -->
                <div class="q-mt-md">
                  <q-badge
                    :color="contribution.status === 'pending' ? 'grey' : 'positive'"
                    class="q-px-sm q-py-xs"
                  >
                    {{ contribution.status === 'pending' ? 'Pending' : 'Under Review' }}
                  </q-badge>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="col-auto">
                <q-btn
                  v-if="contribution.status === 'pending'"
                  flat
                  round
                  color="green"
                  icon="edit"
                  @click="showForm(contribution)"
                >
                  <q-tooltip>Edit Contribution</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="contribution.status === 'pending'"
                  flat
                  round
                  color="green"
                  icon="send"
                  @click="handleRequestReview(contribution.id)"
                >
                  <q-tooltip>Request Review</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Add New Button -->
    <div class="text-center q-mt-lg">
      <q-btn color="green" icon="add" label="Add New Contribution" @click="showForm(null)" />
    </div>

    <!-- Form Dialog -->
    <q-dialog v-model="showDialog" position="bottom">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ formData.id ? 'Edit' : 'New' }} Contribution</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-md" style="max-height: 80vh" scroll>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <!-- Project Details -->
            <div class="row q-col-gutter-md q-pa-md">
              <div class="col-12">
                <q-input
                  v-model="formData.title_of_project"
                  label="Title of Project"
                  outlined
                  :rules="[(val) => !!val || 'Project title is required']"
                />
              </div>

              <!-- Project Dates -->
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData.date_of_initiation_from"
                  label="Start Date"
                  type="date"
                  outlined
                  :rules="[(val) => !!val || 'Start date is required']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData.date_of_initiation_to"
                  label="End Date"
                  type="date"
                  outlined
                  :rules="[(val) => !!val || 'End date is required']"
                />
              </div>
            </div>

            <!-- Publications -->
            <div class="section q-my-md">
              <div class="text-subtitle1 q-mb-sm">Resulting Publications</div>
              <div class="row q-col-gutter-md">
                <div v-for="n in 3" :key="`pub-${n}`" class="col-12">
                  <q-input
                    v-model="formData[`resulting_publications_${n}`]"
                    :label="`Publication ${n}`"
                    outlined
                    type="textarea"
                    :rules="[
                      (val) => (n === 1 ? !!val || 'At least one publication is required' : true),
                    ]"
                  />
                </div>
              </div>
            </div>

            <!-- Funding Sources -->
            <div class="section q-my-md">
              <div class="text-subtitle1 q-mb-sm">Funding Sources</div>
              <div class="row q-col-gutter-md">
                <div v-for="n in 3" :key="`fund-${n}`" class="col-12">
                  <q-input
                    v-model="formData[`funding_sources_${n}`]"
                    :label="`Funding Source ${n}`"
                    outlined
                  />
                </div>
              </div>
            </div>

            <!-- Summary and Description -->
            <div class="row q-col-gutter-md q-pa-md">
              <div class="col-12">
                <q-input
                  v-model="formData.summary_of_work"
                  label="Summary of Work"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'Summary is required']"
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="formData.niw_project_description"
                  label="NIW Project Description"
                  type="textarea"
                  outlined
                  :rules="[(val) => !!val || 'Project description is required']"
                />
              </div>
            </div>

            <!-- Alignment -->
            <div class="row q-col-gutter-md q-pa-md">
              <div class="col-12">
                <q-select
                  v-model="formData.alignment_with_section_i"
                  :options="['yes', 'no']"
                  label="Alignment with Section I"
                  outlined
                  :rules="[(val) => !!val || 'Alignment selection is required']"
                />
              </div>
            </div>

            <!-- Citations -->
            <div class="section q-my-md q-pb-md">
              <div class="text-subtitle1 q-mb-sm">Citations</div>
              <div class="row q-col-gutter-md">
                <div v-for="n in 4" :key="`cite-${n}`" class="col-12 col-md-6">
                  <q-input
                    v-model="formData[`citation_${n}`]"
                    :label="`Citation ${n}`"
                    type="textarea"
                    outlined
                  />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="fixed-bottom q-pa-md" style="z-index: 2000">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn
            type="submit"
            color="green"
            :label="formData.id ? 'Update' : 'Create'"
            :loading="store.isLoading"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Review Request Dialog -->
    <q-dialog v-model="showReviewDialog" persistent>
      <q-card style="min-width: 300px">
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="green" text-color="white" />
          <span class="q-ml-sm">Request Review?</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to submit this contribution for review? Once submitted, you won't be
          able to make further changes.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn
            flat
            label="Request Review"
            color="green"
            @click="confirmRequestReview"
            :loading="requestingReview"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { useContributionsStore } from 'src/stores/contributions'

export default {
  name: 'ContributionsForm',

  setup() {
    const $q = useQuasar()
    const store = useContributionsStore()

    const showDialog = ref(false)
    const showReviewDialog = ref(false)
    const requestingReview = ref(false)
    const selectedContributionId = ref(null)

    const formData = ref({
      id: null,
      title_of_project: '',
      date_of_initiation_from: '',
      date_of_initiation_to: '',
      resulting_publications_1: '',
      resulting_publications_2: '',
      resulting_publications_3: '',
      funding_sources_1: '',
      funding_sources_2: '',
      funding_sources_3: '',
      summary_of_work: '',
      niw_project_description: '',
      alignment_with_section_i: 'yes',
      citation_1: '',
      citation_2: '',
      citation_3: '',
      citation_4: '',
    })

    const resetForm = () => {
      formData.value = {
        id: null,
        title_of_project: '',
        date_of_initiation_from: '',
        date_of_initiation_to: '',
        resulting_publications_1: '',
        resulting_publications_2: '',
        resulting_publications_3: '',
        funding_sources_1: '',
        funding_sources_2: '',
        funding_sources_3: '',
        summary_of_work: '',
        niw_project_description: '',
        alignment_with_section_i: 'yes',
        citation_1: '',
        citation_2: '',
        citation_3: '',
        citation_4: '',
      }
    }

    const showForm = (contribution) => {
      if (contribution) {
        formData.value = { ...contribution }
      } else {
        resetForm()
      }
      showDialog.value = true
    }

    const onSubmit = async () => {
      try {
        await store.saveContribution(formData.value)
        showDialog.value = false
        resetForm()
        $q.notify({
          type: 'positive',
          message: `Contribution ${formData.value.id ? 'updated' : 'created'} successfully`,
        })
        await store.fetchContributions()
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to save contribution',
        })
      }
    }

    const handleRequestReview = (contributionId) => {
      selectedContributionId.value = contributionId
      showReviewDialog.value = true
    }

    const confirmRequestReview = async () => {
      try {
        requestingReview.value = true
        await store.requestReview(selectedContributionId.value)
        showReviewDialog.value = false
        $q.notify({
          type: 'positive',
          message: 'Review requested successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to request review',
        })
      } finally {
        requestingReview.value = false
      }
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMMM D, YYYY')
    }

    onMounted(async () => {
      try {
        await store.fetchContributions()
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to load contributions',
        })
      }
    })

    return {
      store,
      formData,
      showDialog,
      showReviewDialog,
      requestingReview,
      showForm,
      onSubmit,
      handleRequestReview,
      confirmRequestReview,
      formatDate,
    }
  },
}
</script>

<style scoped>
.contributions-list {
  max-width: 1200px;
  margin: 0 auto;
}

ul {
  margin: 0;
  padding-left: 20px;
}

.q-card {
  transition: all 0.3s ease;
}

.q-card:hover {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
