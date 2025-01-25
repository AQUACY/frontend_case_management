<template>
  <div class="questionnaire-section">
    <div class="text-h6 q-mb-md">Questionnaire</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Progress Overview -->
          <div class="col-12 col-md-4">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Completion Status</div>
                <div class="text-h3 text-primary q-mt-md">{{ completionPercentage }}%</div>
                <q-linear-progress
                  :value="completionPercentage / 100"
                  color="primary"
                  class="q-mt-sm"
                />
                <div class="text-caption q-mt-sm">
                  {{ completedSections }} of {{ totalSections }} sections completed
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Section Navigation -->
          <div class="col-12 col-md-8">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Questionnaire Sections</div>
                <q-list separator>
                  <q-item
                    v-for="section in questionnaireSections"
                    :key="section.id"
                    clickable
                    @click="selectSection(section)"
                  >
                    <q-item-section avatar>
                      <q-icon :name="section.icon" :color="getSectionColor(section)" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ section.title }}</q-item-label>
                      <q-item-label caption>
                        {{ section.description }}
                      </q-item-label>
                      <q-linear-progress
                        :value="section.progress"
                        :color="getSectionColor(section)"
                        class="q-mt-sm"
                        size="xs"
                      />
                    </q-item-section>
                    <q-item-section side>
                      <q-chip :color="getSectionColor(section)" text-color="white" size="sm">
                        {{ formatProgress(section.progress) }}
                      </q-chip>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- Selected Section Content -->
          <div v-if="selectedSection" class="col-12">
            <q-card bordered flat>
              <q-card-section>
                <div class="row items-center q-mb-md">
                  <div class="text-subtitle1">{{ selectedSection.title }}</div>
                  <q-space />
                  <q-btn-group flat>
                    <q-btn
                      icon="save"
                      color="primary"
                      label="Save Progress"
                      @click="saveProgress"
                    />
                    <q-btn
                      icon="check_circle"
                      color="positive"
                      label="Mark Complete"
                      @click="markSectionComplete"
                      :disable="!canMarkComplete"
                    />
                  </q-btn-group>
                </div>

                <div class="questions-container">
                  <div
                    v-for="question in selectedSection.questions"
                    :key="question.id"
                    class="q-mb-md"
                  >
                    <div class="text-weight-medium q-mb-sm">
                      {{ question.text }}
                      <q-badge v-if="question.required" color="negative" class="q-ml-sm">
                        Required
                      </q-badge>
                    </div>

                    <!-- Dynamic form inputs based on question type -->
                    <div class="q-gutter-md">
                      <!-- Text Input -->
                      <q-input
                        v-if="question.type === 'text'"
                        v-model="question.answer"
                        :type="question.inputType || 'text'"
                        outlined
                        dense
                        :rules="question.required ? [(val) => !!val || 'Field is required'] : []"
                      />

                      <!-- Textarea -->
                      <q-input
                        v-else-if="question.type === 'textarea'"
                        v-model="question.answer"
                        type="textarea"
                        outlined
                        dense
                        :rules="question.required ? [(val) => !!val || 'Field is required'] : []"
                      />

                      <!-- Select -->
                      <q-select
                        v-else-if="question.type === 'select'"
                        v-model="question.answer"
                        :options="question.options"
                        outlined
                        dense
                        :rules="question.required ? [(val) => !!val || 'Field is required'] : []"
                      />

                      <!-- File Upload -->
                      <q-file
                        v-else-if="question.type === 'file'"
                        v-model="question.answer"
                        outlined
                        dense
                        :rules="question.required ? [(val) => !!val || 'File is required'] : []"
                      >
                        <template v-slot:prepend>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>

                      <!-- Date Picker -->
                      <q-input
                        v-else-if="question.type === 'date'"
                        v-model="question.answer"
                        outlined
                        dense
                        mask="date"
                        :rules="['date']"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="question.answer" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>

                    <div class="text-caption text-grey-7 q-mt-xs">
                      {{ question.hint }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireSection',
  props: {
    questionnaireData: {
      type: Object,
      required: true,
      default: () => ({
        sections: [],
        completedSections: 0,
        totalSections: 0,
      }),
    },
  },
  data() {
    return {
      selectedSection: null,
      questionnaireSections: [],
      completedSections: 0,
      totalSections: 0,
    }
  },
  computed: {
    completionPercentage() {
      return Math.round((this.completedSections / this.totalSections) * 100) || 0
    },
    canMarkComplete() {
      if (!this.selectedSection) return false
      return this.selectedSection.questions.every(
        (q) => !q.required || (q.answer && q.answer.length > 0),
      )
    },
  },
  methods: {
    selectSection(section) {
      this.selectedSection = section
    },
    getSectionColor(section) {
      if (section.progress === 1) return 'positive'
      if (section.progress > 0) return 'warning'
      return 'grey'
    },
    formatProgress(progress) {
      return `${Math.round(progress * 100)}%`
    },
    async saveProgress() {
      try {
        // Implement save progress logic
        await this.saveQuestionnaireProgress()
        this.$q.notify({
          type: 'positive',
          message: 'Progress saved successfully',
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Failed to save progress',
        })
      }
    },
    async markSectionComplete() {
      try {
        // Implement mark complete logic
        await this.markSectionAsComplete()
        this.$q.notify({
          type: 'positive',
          message: 'Section marked as complete',
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Failed to mark section as complete',
        })
      }
    },
    async saveQuestionnaireProgress() {
      // Implement API call to save progress
      console.log('Saving questionnaire progress')
    },
    async markSectionAsComplete() {
      // Implement API call to mark section complete
      console.log('Marking section as complete')
    },
  },
  created() {
    // Initialize data from props
    this.questionnaireSections = this.questionnaireData.sections
    this.completedSections = this.questionnaireData.completedSections
    this.totalSections = this.questionnaireData.totalSections
  },
}
</script>

<style lang="scss" scoped>
.questionnaire-section {
  .questions-container {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
