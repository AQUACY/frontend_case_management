<template>
  <q-page class="q-pa-md">
    <div class="personal-statement-container">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-green">Personal Statement for I-140 Petition</div>
          <div class="text-caption text-grey q-mt-sm">
            This statement will explain your intended work in the United States and demonstrate the
            benefits of your future contributions.
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="savePersonalStatement" ref="personalStatementForm">
            <div class="statement-preview q-mb-lg" v-if="previewMode">
              <div class="text-h6 q-mb-md">Preview</div>
              <div class="preview-text q-pa-md">
                My name is <span class="user-input">{{ formData.personal_name }}</span> and I am the
                petitioner and beneficiary for this I-140 petition. I would like to take this
                opportunity to explain how I intend to continue my work in the United States.
                <span class="user-input">{{ formData.proposed_endeavor }}</span
                >. I hope this letter will serve to illustrate my plans for how I intend to build
                upon my past work for the benefit of the U.S.

                <p class="section-heading">Background:</p>
                <p class="user-input">{{ formData.background_information }}</p>

                <p class="section-heading">Future Intentions:</p>
                <p class="user-input">{{ formData.future_intentions }}</p>

                <template v-if="formData.future_research">
                  <p class="section-heading">Additional Research Plans:</p>
                  <p class="user-input">{{ formData.future_research }}</p>
                </template>

                <p>
                  I hope that this information helps you further understand my proposed endeavor in
                  the United States, and why my future work will be beneficial to the nation. Thank
                  you for taking the time to review this statement and my I-140 petition.
                </p>
              </div>

              <div class="text-caption q-mt-sm">
                Word Count:
                <ul class="q-mt-xs">
                  <li>
                    Background: {{ formData.background_information.split(' ').length }} words
                    (target: 100-200)
                  </li>
                  <li>
                    Future Intentions: {{ formData.future_intentions.split(' ').length }} words
                    (target: 500-700)
                  </li>
                </ul>
              </div>
            </div>

            <div class="form-fields q-gutter-y-lg">
              <div class="field-group">
                <div class="text-subtitle2 q-mb-sm">Personal Information</div>
                <q-input
                  v-model="formData.personal_name"
                  label="Your Full Name *"
                  outlined
                  :rules="[(val) => !!val || 'Name is required']"
                />
              </div>

              <div class="field-group">
                <div class="text-subtitle2 q-mb-sm">Proposed Endeavor</div>
                <div class="text-caption q-mb-sm">
                  State your proposed endeavor as agreed upon with your Case Manager.
                </div>
                <q-input
                  v-model="formData.proposed_endeavor"
                  type="textarea"
                  outlined
                  rows="4"
                  :rules="[(val) => !!val || 'Proposed endeavor is required']"
                />
              </div>

              <div class="field-group">
                <div class="text-subtitle2 q-mb-sm">Background Information (100-200 words)</div>
                <div class="text-caption q-mb-sm">
                  Briefly summarize your background, experience, and achievements. Focus on
                  providing a summary that will help USCIS understand your area of expertise.
                </div>
                <q-input
                  v-model="formData.background_information"
                  type="textarea"
                  outlined
                  rows="6"
                  :rules="[
                    (val) => !!val || 'Background information is required',
                    (val) => val.split(' ').length >= 100 || 'Please provide at least 100 words',
                    (val) => val.split(' ').length <= 200 || 'Please keep it under 200 words',
                  ]"
                >
                  <template v-slot:append>
                    <q-badge color="primary" class="q-pa-xs">
                      {{ formData.background_information.split(' ').length }} words
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <div class="field-group">
                <div class="text-subtitle2 q-mb-sm">Future Intentions (500-700 words)</div>
                <div class="text-caption q-mb-sm">
                  Explain your future career goals and why your intended work is important. Focus on
                  the next 2-3 years and be as specific as possible.
                </div>
                <q-input
                  v-model="formData.future_intentions"
                  type="textarea"
                  outlined
                  rows="10"
                  :rules="[
                    (val) => !!val || 'Future intentions are required',
                    (val) => val.split(' ').length >= 500 || 'Please provide at least 500 words',
                    (val) => val.split(' ').length <= 700 || 'Please keep it under 700 words',
                  ]"
                >
                  <template v-slot:append>
                    <q-badge color="primary" class="q-pa-xs">
                      {{ formData.future_intentions.split(' ').length }} words
                    </q-badge>
                  </template>
                </q-input>
              </div>

              <div class="field-group">
                <div class="text-subtitle2 q-mb-sm">Additional Future Research (Optional)</div>
                <div class="text-caption q-mb-sm">
                  Describe any additional research projects or future work, focusing on general
                  terms rather than specific employer-related activities.
                </div>
                <q-input
                  v-model="formData.future_research"
                  type="textarea"
                  outlined
                  rows="6"
                  hint="Focus on broader research goals rather than specific employer-related projects"
                />
              </div>
            </div>

            <div class="row justify-between q-mt-lg">
              <q-btn
                :label="previewMode ? 'Edit' : 'Preview'"
                color="secondary"
                @click="previewMode = !previewMode"
              />
              <q-btn label="Save" type="submit" color="primary" :loading="saving" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePersonalStatementStore } from 'src/stores/personalStatement'

export default {
  name: 'PersonalStatementView',

  setup() {
    const $q = useQuasar()
    const store = usePersonalStatementStore()
    const personalStatementForm = ref(null)
    const saving = ref(false)
    const previewMode = ref(false)

    const formData = ref({
      personal_name: '',
      background_information: '',
      proposed_endeavor: '',
      future_intentions: '',
      future_research: '',
    })

    const loadPersonalStatement = async () => {
      try {
        const data = await store.fetchPersonalStatement()
        if (data) {
          formData.value = { ...data }
        }
      } catch (error) {
        console.error('Error loading personal statement:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load personal statement',
        })
      }
    }

    const savePersonalStatement = async () => {
      try {
        saving.value = true
        await store.savePersonalStatement(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Personal statement saved successfully',
        })
      } catch (error) {
        console.error('Error saving personal statement:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to save personal statement',
        })
      } finally {
        saving.value = false
      }
    }

    onMounted(loadPersonalStatement)

    return {
      formData,
      personalStatementForm,
      saving,
      previewMode,
      savePersonalStatement,
    }
  },
}
</script>

<style lang="scss" scoped>
.personal-statement-container {
  max-width: 800px;
  margin: 0 auto;
}

.field-group {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.preview-text {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  line-height: 1.6;
  white-space: pre-line;
  font-size: 1.1rem;

  p {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-heading {
    font-weight: 600;
    color: #1976d2;
    margin-top: 1.5rem;
  }

  .user-input {
    font-weight: 600;
    color: #2e7d32;
    background-color: #f1f8e9;
    padding: 2px 4px;
    border-radius: 4px;
  }
}

ul {
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 4px;
  }
}
</style>
