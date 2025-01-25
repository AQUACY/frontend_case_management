<template>
  <div class="case-preparation-section">
    <div class="text-h6 q-mb-md">Case Preparation</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Checklist Progress -->
          <div class="col-12 col-md-4">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Preparation Progress</div>
                <div class="text-h3 text-primary q-mt-md">{{ calculateProgress }}%</div>
                <q-linear-progress
                  :value="calculateProgress / 100"
                  color="primary"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Next Steps -->
          <div class="col-12 col-md-8">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Next Steps</div>
                <q-list separator>
                  <q-item v-for="step in nextSteps" :key="step.id">
                    <q-item-section avatar>
                      <q-icon :name="step.icon" :color="step.color" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ step.title }}</q-item-label>
                      <q-item-label caption>{{ step.description }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        :color="step.color"
                        :label="step.action"
                        outline
                        size="sm"
                        @click="handleStepAction(step)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- Checklist -->
          <div class="col-12">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Preparation Checklist</div>
                <q-list separator>
                  <q-expansion-item
                    v-for="category in checklistCategories"
                    :key="category.id"
                    :label="category.name"
                    :caption="`${category.completedItems} of ${category.totalItems} completed`"
                    :icon="category.icon"
                    expand-separator
                  >
                    <q-card>
                      <q-card-section>
                        <q-list>
                          <q-item v-for="item in category.items" :key="item.id">
                            <q-item-section side>
                              <q-checkbox v-model="item.completed" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ item.title }}</q-item-label>
                              <q-item-label caption>{{ item.description }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-btn
                                v-if="item.hasAction"
                                :color="item.actionColor || 'primary'"
                                :label="item.actionLabel"
                                outline
                                size="sm"
                                @click="handleItemAction(item)"
                              />
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
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
  name: 'CasePreparationSection',
  props: {
    preparationDetails: {
      type: Object,
      required: true,
      default: () => ({
        nextSteps: [],
        checklistCategories: [],
      }),
    },
  },
  computed: {
    calculateProgress() {
      let completed = 0
      let total = 0

      this.checklistCategories.forEach((category) => {
        category.items.forEach((item) => {
          total++
          if (item.completed) completed++
        })
      })

      return Math.round((completed / total) * 100) || 0
    },
    nextSteps() {
      return this.preparationDetails.nextSteps || []
    },
    checklistCategories() {
      return this.preparationDetails.checklistCategories || []
    },
  },
  methods: {
    handleStepAction(step) {
      // Implement step action handling
      console.log('Handle step action:', step)
    },
    handleItemAction(item) {
      // Implement item action handling
      console.log('Handle item action:', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.case-preparation-section {
  .q-expansion-item {
    &__content {
      background: #f5f5f5;
    }
  }
}
</style>
