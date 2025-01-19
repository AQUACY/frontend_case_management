<template>
  <q-page class="q-pa-md">
    <div class="summary-container">
      <!-- Header -->
      <h4 class="text-h5 q-mb-md">Summary of Contributions</h4>

      <!-- Save Status -->
      <div class="text-body2 q-mb-sm text-grey-8">
        SoC Saved at {{ currentDateTime }} by client.
      </div>
      <div class="text-caption q-mb-md text-grey-7">
        Your progress can be saved at any time by clicking "Save SoC" at the bottom of each section.
      </div>

      <!-- Download Link -->
      <div class="q-mb-lg">
        <span class="text-body2"
          >A zip file containing samples of the summary of contributions tab can be found
        </span>
        <a href="#" class="text-primary">here</a>.
      </div>

      <!-- Sections -->
      <div class="sections q-gutter-y-md">
        <!-- Section I -->
        <q-expansion-item
          group="sections"
          icon="chevron_right"
          label="SECTION I: BACKGROUND INFORMATION"
          header-class="bg-grey-2"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="section-content">
                <!-- Background Information Form -->
                <div class="row q-col-gutter-md">
                  <!-- Add your form fields here -->
                </div>
                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Save SoC" @click="saveSectionI" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- Section II -->
        <q-expansion-item
          group="sections"
          icon="chevron_right"
          label="SECTION II: CONTRIBUTIONS"
          header-class="bg-grey-2"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="section-content">
                <!-- Contributions Form -->
                <div class="row q-col-gutter-md">
                  <!-- Add your form fields here -->
                </div>
                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Save SoC" @click="saveSectionII" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- Section III -->
        <q-expansion-item
          group="sections"
          icon="chevron_right"
          label="SECTION III: ADDITIONAL QUALIFICATIONS"
          header-class="bg-grey-2"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="section-content">
                <!-- Additional Qualifications Form -->
                <div class="row q-col-gutter-md">
                  <!-- Add your form fields here -->
                </div>
                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Save SoC" @click="saveSectionIII" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- Status Indicators -->
      <div class="status-indicators q-mt-lg">
        <div v-for="section in sections" :key="section.id" class="q-mb-sm">
          <q-chip
            :color="section.status === 'Finalized' ? 'positive' : 'grey'"
            text-color="white"
            size="sm"
          >
            {{ section.status }}
          </q-chip>
          <span class="q-ml-sm">{{ section.label }}</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { date } from 'quasar'

export default {
  name: 'SummaryofContribution',

  setup() {
    const currentDateTime = computed(() => {
      return date.formatDate(new Date(), 'MM/DD/YYYY h:mm a')
    })

    const sections = ref([
      {
        id: 1,
        label: 'SECTION I: BACKGROUND INFORMATION',
        status: 'Finalized',
      },
      {
        id: 2,
        label: 'SECTION II: CONTRIBUTIONS',
        status: 'Finalized',
      },
      {
        id: 3,
        label: 'SECTION III: ADDITIONAL QUALIFICATIONS',
        status: 'Finalized',
      },
    ])

    const saveSectionI = () => {
      // Implement save logic
    }

    const saveSectionII = () => {
      // Implement save logic
    }

    const saveSectionIII = () => {
      // Implement save logic
    }

    return {
      currentDateTime,
      sections,
      saveSectionI,
      saveSectionII,
      saveSectionIII,
    }
  },
}
</script>

<style scoped>
.summary-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-content {
  min-height: 200px;
}

.q-expansion-item :deep(.q-expansion-item__container) {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.q-expansion-item :deep(.q-item) {
  padding: 16px;
}
</style>
