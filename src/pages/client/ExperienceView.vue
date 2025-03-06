<template>
  <q-page class="q-pa-md">
    <div class="experience-container">
      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          class="text-green"
          active-color="green"
          indicator-color="green"
          align="justify"
        >
          <q-tab name="education" label="Education" />
          <q-tab name="work" label="Work Experience" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <!-- Education Panel -->
          <q-tab-panel name="education">
            <div class="text-h6 text-green q-mb-md">Education History</div>

            <!-- Education Form -->
            <q-form @submit="saveEducation" class="q-gutter-md">
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="educationForm.university_name"
                    label="University Name *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="educationForm.location"
                    label="Location *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="educationForm.degree_type"
                    label="Degree Type *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="educationForm.degree_majors" label="Major(s)" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="educationForm.degree_minors" label="Minor(s)" outlined />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="educationForm.start_year"
                    label="Start Year *"
                    type="number"
                    :rules="[
                      (val) => !!val || 'Required',
                      (val) => val >= 1900 || 'Year must be 1900 or later',
                      (val) => val <= new Date().getFullYear() + 10 || 'Invalid future year',
                    ]"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="educationForm.completion_year"
                    label="Completion Year *"
                    type="number"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="green" label="Add Education" :loading="saving" />
              </div>
            </q-form>

            <!-- Education List -->
            <q-list separator class="q-mt-md">
              <q-item v-for="edu in education" :key="edu.id">
                <q-item-section>
                  <q-item-label>{{ edu.university_name }}</q-item-label>
                  <q-item-label caption>Start Year: {{ edu.start_year }}</q-item-label>
                  <q-item-label caption>Completed: {{ edu.completion_year }}</q-item-label>
                  <q-item-label caption>Location: {{ edu.location }}</q-item-label>
                  <q-item-label caption>Degree Type: {{ edu.degree_type }}</q-item-label>
                  <q-item-label caption>Major(s): {{ edu.degree_majors }}</q-item-label>
                  <q-item-label caption>Minor(s): {{ edu.degree_minors }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="row items-center">
                    <q-btn flat round color="green" icon="edit" @click="editEducation(edu)" />
                    <q-btn
                      flat
                      round
                      color="negative"
                      icon="delete"
                      @click="deleteEducation(edu.id)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <!-- Work Experience Panel -->
          <q-tab-panel name="work">
            <div class="text-h6 text-green q-mb-md">Work Experience</div>

            <!-- Work Experience Form -->
            <q-form @submit="saveWorkExperience" class="q-gutter-md">
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="workForm.employer_name"
                    label="Employer Name *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="workForm.job_title"
                    label="Job Title *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="workForm.address_1"
                    label="Address Line 1 *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="workForm.address_2" label="Address Line 2" outlined />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="workForm.city"
                    label="City *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="workForm.state"
                    label="State *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="workForm.postal_code"
                    label="Postal Code *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="workForm.country"
                    label="Country *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="workForm.business_type"
                    label="Business Type *"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="workForm.start_date"
                    label="Start Date *"
                    type="date"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="workForm.end_date" label="End Date" type="date" outlined />
                </div>
                <div class="col-12 col-md-4">
                  <q-input
                    v-model="workForm.hours_worked"
                    label="Hours Worked *"
                    type="number"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="workForm.job_details"
                    label="Job Details *"
                    type="textarea"
                    :rules="[(val) => !!val || 'Required']"
                    outlined
                  />
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="green" label="Add Work Experience" :loading="saving" />
              </div>
            </q-form>

            <!-- Work Experience List -->
            <q-list separator class="q-mt-md">
              <q-item v-for="work in workExperience" :key="work.id">
                <q-item-section>
                  <q-item-label>{{ work.employer_name }}</q-item-label>
                  <q-item-label caption>{{ work.job_title }}</q-item-label>
                  <q-item-label caption>
                    {{ formatDate(work.start_date) }} - {{ formatDate(work.end_date) || 'Present' }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="row items-center">
                    <q-btn flat round color="green" icon="edit" @click="editWorkExperience(work)" />
                    <q-btn
                      flat
                      round
                      color="negative"
                      icon="delete"
                      @click="deleteWorkExperience(work.id)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <!-- Education Edit Dialog -->
    <q-dialog v-model="educationDialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Education</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="updateEducation" class="q-gutter-md">
            <q-input
              v-model="educationDialog.form.university_name"
              label="University Name *"
              :rules="[(val) => !!val || 'Required']"
              outlined
            />
            <q-input
              v-model="educationDialog.form.location"
              label="Location *"
              :rules="[(val) => !!val || 'Required']"
              outlined
            />
            <q-input
              v-model="educationDialog.form.degree_type"
              label="Degree Type *"
              :rules="[(val) => !!val || 'Required']"
              outlined
            />
            <q-input v-model="educationDialog.form.degree_majors" label="Major(s)" outlined />
            <q-input v-model="educationDialog.form.degree_minors" label="Minor(s)" outlined />
            <q-input
              v-model="educationDialog.form.start_year"
              label="Start Year *"
              type="number"
              :rules="[(val) => !!val || 'Required']"
              outlined
            />
            <q-input
              v-model="educationDialog.form.completion_year"
              label="Completion Year *"
              type="number"
              :rules="[(val) => !!val || 'Required']"
              outlined
            />
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn type="submit" label="Save" color="green" :loading="educationDialog.saving" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Work Experience Edit Dialog -->
    <q-dialog v-model="workDialog.show" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Edit Work Experience</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="updateWorkExperience" class="q-gutter-md">
            <div class="row q-col-gutter-md q-pa-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="workDialog.form.employer_name"
                  label="Employer Name *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="workDialog.form.job_title"
                  label="Job Title *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="workDialog.form.address_1"
                  label="Address Line 1 *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="workDialog.form.address_2" label="Address Line 2" outlined />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="workDialog.form.city"
                  label="City *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="workDialog.form.state"
                  label="State *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="workDialog.form.postal_code"
                  label="Postal Code *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="workDialog.form.country"
                  label="Country *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="workDialog.form.business_type"
                  label="Business Type *"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="workDialog.form.start_date"
                  label="Start Date *"
                  type="date"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="workDialog.form.end_date" label="End Date" type="date" outlined />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="workDialog.form.hours_worked"
                  label="Hours Worked *"
                  type="number"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="workDialog.form.job_details"
                  label="Job Details *"
                  type="textarea"
                  :rules="[(val) => !!val || 'Required']"
                  outlined
                />
              </div>
            </div>
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn type="submit" label="Save" color="green" :loading="workDialog.saving" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useExperienceStore } from 'src/stores/experience'
import { date } from 'quasar'

export default {
  name: 'ExperienceView',

  setup() {
    const $q = useQuasar()
    const store = useExperienceStore()
    const tab = ref('education')
    const saving = ref(false)
    const education = ref([])
    const workExperience = ref([])

    const educationForm = ref({
      university_name: '',
      location: '',
      degree_type: '',
      degree_majors: '',
      degree_minors: '',
      start_year: '',
      completion_year: '',
    })

    const workForm = ref({
      employer_name: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      business_type: '',
      job_title: '',
      start_date: '',
      end_date: '',
      hours_worked: '',
      job_details: '',
    })

    // Add these new refs for dialogs
    const educationDialog = ref({
      show: false,
      saving: false,
      form: {
        id: null,
        university_name: '',
        location: '',
        degree_type: '',
        degree_majors: '',
        degree_minors: '',
        start_year: '',
        completion_year: '',
      },
    })

    const workDialog = ref({
      show: false,
      saving: false,
      form: {
        id: null,
        employer_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        business_type: '',
        job_title: '',
        start_date: '',
        end_date: '',
        hours_worked: '',
        job_details: '',
      },
    })

    const formatDate = (dateString) => {
      if (!dateString) return ''
      return date.formatDate(dateString, 'MMMM D, YYYY')
    }

    const loadData = async () => {
      try {
        education.value = await store.fetchEducation()
        workExperience.value = await store.fetchWorkExperience()
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to load data',
        })
        console.log(error)
      }
    }

    const saveEducation = async () => {
      try {
        saving.value = true
        await store.saveEducation(educationForm.value)
        await loadData()
        educationForm.value = { university_name: '', completion_year: '' }
        $q.notify({
          type: 'positive',
          message: 'Education saved successfully',
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to save education',
        })
        console.log(error)
      } finally {
        saving.value = false
      }
    }

    const saveWorkExperience = async () => {
      try {
        saving.value = true
        await store.saveWorkExperience(workForm.value)
        await loadData()
        workForm.value = {
          employer_name: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          country: '',
          postal_code: '',
          business_type: '',
          job_title: '',
          start_date: '',
          end_date: '',
          hours_worked: '',
          job_details: '',
        }
        $q.notify({
          type: 'positive',
          message: 'Work experience saved successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save work experience',
        })
      } finally {
        saving.value = false
      }
    }

    const deleteEducation = async (id) => {
      try {
        await store.deleteEducation(id)
        await loadData()
        $q.notify({
          type: 'positive',
          message: 'Education deleted successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete education',
        })
      }
    }

    const deleteWorkExperience = async (id) => {
      try {
        await store.deleteWorkExperience(id)
        await loadData()
        $q.notify({
          type: 'positive',
          message: 'Work experience deleted successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete work experience',
        })
      }
    }

    // Add these new methods
    const editEducation = (education) => {
      educationDialog.value.form = { ...education }
      educationDialog.value.show = true
    }

    const editWorkExperience = (work) => {
      // Format dates for input fields
      const formattedWork = {
        ...work,
        start_date: work.start_date ? work.start_date.split('T')[0] : '',
        end_date: work.end_date ? work.end_date.split('T')[0] : '',
      }
      workDialog.value.form = formattedWork
      workDialog.value.show = true
    }

    const updateEducation = async () => {
      try {
        educationDialog.value.saving = true
        await store.updateEducation(educationDialog.value.form.id, educationDialog.value.form)
        await loadData()
        educationDialog.value.show = false
        $q.notify({
          type: 'positive',
          message: 'Education updated successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to update education',
        })
      } finally {
        educationDialog.value.saving = false
      }
    }

    const updateWorkExperience = async () => {
      try {
        workDialog.value.saving = true
        await store.updateWorkExperience(workDialog.value.form.id, workDialog.value.form)
        await loadData()
        workDialog.value.show = false
        $q.notify({
          type: 'positive',
          message: 'Work experience updated successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Failed to update work experience',
        })
      } finally {
        workDialog.value.saving = false
      }
    }

    onMounted(loadData)

    return {
      tab,
      saving,
      education,
      workExperience,
      educationForm,
      workForm,
      formatDate,
      saveEducation,
      saveWorkExperience,
      deleteEducation,
      deleteWorkExperience,
      educationDialog,
      workDialog,
      editEducation,
      editWorkExperience,
      updateEducation,
      updateWorkExperience,
    }
  },
}
</script>

<style scoped>
.experience-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
