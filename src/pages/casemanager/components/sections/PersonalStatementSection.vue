<template>
  <div class="personal-statement-section q-pa-md">
    <!-- Main View -->
    <q-card flat bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Personal Statement</div>
        <q-btn
          color="primary"
          icon="description"
          label="View Printable Format"
          @click="showPrintDialog = true"
        />
      </q-card-section>

      <!-- Regular content display -->
      <q-card-section v-if="!loading && !error">
        <!-- Control Panel Card -->
        <!-- <q-card flat bordered class="q-mb-md">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">Personal Statement</div>
            <q-btn color="primary" icon="print" label="Print Statement" @click="printStatement" />
          </q-card-section>
        </q-card> -->

        <!-- Printable Content -->
        <q-card flat bordered class="print-container">
          <q-card-section>
            <!-- Document Header -->
            <div class="text-center q-mb-xl">
              <h1 class="text-h4 q-mb-sm">Personal Statement</h1>
              <div class="text-h6">{{ statementData.personal_name }}</div>
              <div class="text-subtitle1 text-grey-8">
                Last Updated: {{ formatDate(statementData.updated_at) }}
              </div>
            </div>

            <!-- Document Sections -->
            <div class="statement-content q-py-md">
              <!-- Proposed Endeavor -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Proposed Endeavor</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.proposed_endeavor }}
                </div>
              </section>

              <!-- Background Information -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Background Information</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.background_information }}
                </div>
              </section>

              <!-- Future Intentions -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Future Intentions</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.future_intentions }}
                </div>
              </section>

              <!-- Future Research -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Future Research</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.future_research }}
                </div>
              </section>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <!-- Printable Dialog -->
    <q-dialog
      v-model="showPrintDialog"
      maximized
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="print-dialog">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Printable Personal Statement</div>
          <q-space />
          <q-btn
            color="primary"
            icon="print"
            label="Print"
            @click="printStatement"
            class="q-mr-sm"
          />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <!-- Printable Content -->
        <q-card-section class="scroll">
          <div id="printable-content" class="print-container q-pa-md">
            <!-- Document Header -->
            <div class="text-center q-mb-xl">
              <h1 class="text-h4 q-mb-sm">Personal Statement</h1>
              <div class="text-h6">{{ statementData.personal_name }}</div>
              <div class="text-subtitle1 text-grey-8">
                Last Updated: {{ formatDate(statementData.updated_at) }}
              </div>
            </div>

            <!-- Document Sections -->
            <div class="statement-content q-py-md">
              <!-- Proposed Endeavor -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Proposed Endeavor</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.proposed_endeavor }}
                </div>
              </section>

              <!-- Background Information -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Background Information</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.background_information }}
                </div>
              </section>

              <!-- Future Intentions -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Future Intentions</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.future_intentions }}
                </div>
              </section>

              <!-- Future Research -->
              <section class="q-mb-xl">
                <h2 class="text-h5 q-mb-md">Future Research</h2>
                <div class="text-body1 statement-text">
                  {{ statementData.future_research }}
                </div>
              </section>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Loading State -->
    <div v-if="loading" class="absolute-center">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey q-mt-md">Loading personal statement...</div>
    </div>

    <!-- Error State -->
    <q-dialog v-model="showError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ error }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Dismiss" color="red" v-close-popup />
          <q-btn flat label="Retry" color="primary" @click="fetchPersonalStatement" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'PersonalStatementSection',

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
    const showError = ref(false)
    const statementData = ref({})
    const showPrintDialog = ref(false)

    const formatDate = (date) => {
      if (!date) return 'Not Available'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const printStatement = () => {
      const content = document.getElementById('printable-content')
      const printWindow = window.open('', '_blank')

      printWindow.document.write(`
        <html>
          <head>
            <title>Personal Statement</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 2cm;
              }
              .print-container {
                max-width: 800px;
                margin: 0 auto;
              }
              .statement-text {
                text-align: justify;
                white-space: pre-line;
                margin-bottom: 2em;
              }
              h1 {
                text-align: center;
                color: #1976d2;
              }
              h2 {
                color: #1976d2;
                margin-top: 1.5em;
              }
              .text-center {
                text-align: center;
              }
              .text-grey-8 {
                color: #666;
              }
              @media print {
                @page {
                  margin: 2cm;
                }
              }
            </style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }

    const fetchPersonalStatement = async () => {
      loading.value = true
      error.value = null
      showError.value = false

      try {
        const response = await api.get(`/api/auth/cases/${props.caseId}/personal-statement`)
        statementData.value = response.data.data
      } catch (err) {
        console.error(err)
        error.value = 'Error loading personal statement. Please try again.'
        showError.value = true
        $q.notify({
          type: 'negative',
          message: 'Failed to load personal statement',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.caseId) {
        fetchPersonalStatement()
      }
    })

    return {
      loading,
      error,
      showError,
      statementData,
      formatDate,
      showPrintDialog,
      printStatement,
      fetchPersonalStatement,
    }
  },
}
</script>

<style lang="scss">
.personal-statement-section {
  .print-container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
  }

  .statement-content {
    line-height: 1.8;

    section {
      page-break-inside: avoid;
    }

    .statement-text {
      white-space: pre-line;
      text-align: justify;
    }
  }

  .print-dialog {
    .print-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
    }

    .statement-content {
      line-height: 1.8;

      section {
        page-break-inside: avoid;
      }

      .statement-text {
        white-space: pre-line;
        text-align: justify;
      }
    }
  }

  // Print styles
  @media print {
    .q-card:not(.print-container) {
      display: none;
    }

    .print-container {
      border: none !important;
      box-shadow: none !important;
    }

    .statement-content {
      h2 {
        color: #000 !important;
      }
    }

    @page {
      margin: 2cm;
    }
  }
}
</style>
