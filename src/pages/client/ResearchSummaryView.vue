<template>
  <q-page class="q-pa-md">
    <div class="research-container">
      <!-- Loading State -->
      <div v-if="loading" class="full-width row justify-center items-center" style="height: 400px">
        <q-spinner color="green" size="3em" />
      </div>

      <div v-else>
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-green">Research Summary</div>
            <div class="text-caption text-grey q-mt-sm">
              Please provide detailed information about your research and expertise.
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- Field Description -->
              <div class="q-mb-lg">
                <div class="text-subtitle1 q-mb-sm">1. What do you consider to be your field?</div>
                <div class="text-caption q-mb-sm">
                  This should be a very short description – a few words at most – and should be
                  broad enough to cover all of your past, current, and anticipated future work.
                </div>
                <q-input
                  v-model="formData.field_description"
                  type="text"
                  outlined
                  :rules="[(val) => !!val || 'Field description is required']"
                />
              </div>

              <!-- Projects -->
              <div class="q-mb-lg">
                <div class="text-subtitle1 q-mb-sm">
                  2. Please provide a brief summary of the focus of your past work:
                </div>
                <div v-for="(project, index) in formData.projects" :key="index" class="q-mb-md">
                  <div class="row items-center q-col-gutter-md">
                    <div class="col">
                      <q-input
                        v-model="project.project_description"
                        type="textarea"
                        outlined
                        :label="`Project ${index + 1}`"
                        :rules="[(val) => !!val || 'Project description is required']"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        v-if="formData.projects.length > 1"
                        flat
                        round
                        color="negative"
                        icon="remove"
                        @click="removeProject(index)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row justify-end">
                  <q-btn flat color="green" icon="add" label="Add Project" @click="addProject" />
                </div>
              </div>

              <!-- Expertise Description -->
              <div class="q-mb-lg">
                <div class="text-subtitle1 q-mb-sm">
                  3. Please provide a brief description of your expertise.
                </div>
                <div class="text-caption q-mb-sm">
                  What makes you an expert in your field? What separates you from your peers?
                </div>
                <q-input
                  v-model="formData.expertise_description"
                  type="textarea"
                  outlined
                  autogrow
                  :rules="[(val) => !!val || 'Expertise description is required']"
                />
              </div>

              <!-- Work Impact -->
              <div class="q-mb-lg">
                <div class="text-subtitle1 q-mb-sm">
                  4. Please briefly describe the impact of your specific work.
                </div>
                <div class="text-caption q-mb-sm">Who benefits from the work that you do?</div>
                <q-input
                  v-model="formData.work_impact"
                  type="textarea"
                  outlined
                  autogrow
                  :rules="[(val) => !!val || 'Work impact description is required']"
                />
              </div>

              <!-- Submit Button -->
              <div class="row justify-end q-gutter-sm">
                <q-btn
                  type="submit"
                  color="green"
                  :label="researchExists ? 'Update' : 'Save'"
                  :loading="saving"
                />
                <q-btn
                  v-if="researchExists"
                  flat
                  color="negative"
                  label="Delete"
                  :loading="deleting"
                  @click="deleteResearch"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useResearchStore } from 'src/stores/research'

export default {
  name: 'ResearchSummaryView',

  setup() {
    const $q = useQuasar()
    const store = useResearchStore()
    const loading = ref(false)
    const saving = ref(false)
    const deleting = ref(false)
    const researchExists = ref(false)

    const formData = ref({
      field_description: '',
      expertise_description: '',
      work_impact: '',
      projects: [{ project_description: '' }],
    })

    const loadResearch = async () => {
      try {
        loading.value = true
        const data = await store.fetchResearchSummary()
        if (data) {
          formData.value = {
            ...data,
            projects: data.projects || [{ project_description: '' }],
          }
          researchExists.value = true
        }
      } catch (error) {
        console.error('Error loading research:', error)
      } finally {
        loading.value = false
      }
    }

    const addProject = () => {
      formData.value.projects.push({ project_description: '' })
    }

    const removeProject = (index) => {
      formData.value.projects.splice(index, 1)
    }

    const onSubmit = async () => {
      try {
        saving.value = true
        if (researchExists.value) {
          await store.updateResearchSummary(formData.value)
          $q.notify({
            type: 'positive',
            message: 'Research summary updated successfully',
          })
        } else {
          await store.saveResearchSummary(formData.value)
          researchExists.value = true
          $q.notify({
            type: 'positive',
            message: 'Research summary saved successfully',
          })
        }
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save research summary',
        })
      } finally {
        saving.value = false
      }
    }

    const deleteResearch = async () => {
      try {
        deleting.value = true
        await store.deleteResearchSummary()
        formData.value = {
          field_description: '',
          expertise_description: '',
          work_impact: '',
          projects: [{ project_description: '' }],
        }
        researchExists.value = false
        $q.notify({
          type: 'positive',
          message: 'Research summary deleted successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete research summary',
        })
      } finally {
        deleting.value = false
      }
    }

    onMounted(loadResearch)

    return {
      loading,
      saving,
      deleting,
      researchExists,
      formData,
      addProject,
      removeProject,
      onSubmit,
      deleteResearch,
    }
  },
}
</script>

<style scoped>
.research-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
