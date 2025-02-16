<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!-- Welcome Section -->
      <div class="col-12">
        <q-card class="welcome-card q-pa-md" style="">
          <q-card-section>
            <div class="text-h4 text-weight-bold q-mb-md" style="color: white">
              Welcome, Case Manager!
            </div>
            <div class="text-subtitle1">
              This guide will help you understand how to effectively assist clients and manage
              cases.
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Process Steps -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md" style="color: #02943f">
              Case Management Process
            </div>
            <q-timeline color="green">
              <q-timeline-entry
                title="Initial Client Contact"
                subtitle="First Step"
                icon="contact_page"
              >
                <div>
                  • Review client's basic information<br />
                  • Verify contact details<br />
                  • Schedule initial consultation<br />
                  • Document client's primary concerns
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Information Gathering"
                subtitle="Second Step"
                icon="fact_check"
              >
                <div>
                  • Collect required documents<br />
                  • Verify document authenticity<br />
                  • Create digital copies<br />
                  • Organize client files
                </div>
              </q-timeline-entry>

              <q-timeline-entry title="Case Assessment" subtitle="Third Step" icon="assessment">
                <div>
                  • Evaluate case details<br />
                  • Identify potential challenges<br />
                  • Determine required resources<br />
                  • Estimate timeline
                </div>
              </q-timeline-entry>

              <q-timeline-entry title="Case Processing" subtitle="Fourth Step" icon="work">
                <div>
                  • Submit necessary paperwork<br />
                  • Track case progress<br />
                  • Update client regularly<br />
                  • Address any issues promptly
                </div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>

      <!-- Important Reminders -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green q-mb-md">Key Reminders</div>
            <q-list bordered separator>
              <q-item v-ripple>
                <q-item-section avatar>
                  <q-icon color="green" name="schedule" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Timely Communication</q-item-label>
                  <q-item-label caption> Respond to client inquiries within 24 hours </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple>
                <q-item-section avatar>
                  <q-icon color="green" name="verified_user" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Data Privacy</q-item-label>
                  <q-item-label caption> Always maintain client confidentiality </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple>
                <q-item-section avatar>
                  <q-icon color="green" name="update" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Regular Updates</q-item-label>
                  <q-item-label caption> Keep case information current and accurate </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple>
                <q-item-section avatar>
                  <q-icon color="green" name="gavel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Compliance</q-item-label>
                  <q-item-label caption>
                    Follow all legal and regulatory requirements
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-md" v-if="roleId === 2">
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green q-mb-md">Quick Actions</div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                  color="green"
                  class="full-width"
                  icon="person_add"
                  label="New Client"
                  to="/casemanager/clients"
                />
              </div>
              <div class="col-6">
                <q-btn
                  color="green"
                  class="full-width"
                  icon="add_task"
                  label="New Case"
                  to="/casemanager/cases"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- Quick Actions -->
        <q-card class="q-mt-md" v-if="roleId === 2">
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green q-mb-md">Quick Actions</div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                  color="green"
                  class="full-width"
                  icon="person_add"
                  label="New Client"
                  to="/casemanager/clients"
                />
              </div>
              <div class="col-6">
                <q-btn
                  color="green"
                  class="full-width"
                  icon="add_task"
                  label="New Case"
                  to="/casemanager/cases"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Add new Guide Documents card -->
        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green q-mb-md">Guide Documents</div>

            <q-select
              v-model="selectedComponent"
              :options="componentOptions"
              label="Select Component"
              outlined
              class="q-mb-md"
            />

            <div class="folder-structure q-pa-md" v-if="selectedComponent">
              <q-list bordered separator>
                <q-item-label header>{{ selectedComponent.label }} Documents</q-item-label>

                <q-item
                  v-for="file in getComponentFiles(selectedComponent.value)"
                  :key="file.name"
                  clickable
                  @click="downloadGuideDoc(file.path)"
                >
                  <q-item-section avatar>
                    <q-icon
                      :name="file.type === 'pdf' ? 'picture_as_pdf' : 'description'"
                      :color="file.type === 'pdf' ? 'red' : 'primary'"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ file.name }}</q-item-label>
                    <q-item-label caption>{{ file.type.toUpperCase() }} Document</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn
                      flat
                      round
                      color="green"
                      icon="download"
                      :loading="loading && currentFile === file.path"
                    >
                      <q-tooltip>Download Document</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'CaseManagerGuidePage',

  setup() {
    const $q = useQuasar()
    const roleId = ref(null)
    const loading = ref(false)
    const currentFile = ref(null)
    const selectedComponent = ref(null)

    const componentOptions = [
      { label: 'All  ', value: 'all' },
      // { label: 'Form i-140 Questionnaire ', value: 'personal' },
      // { label: 'Education & Professional Experience', value: 'education' },
      // { label: 'Employment History', value: 'employment' },
      // { label: 'Recommendation Letters', value: 'recommendations' },
      // { label: 'Supporting Documents', value: 'documents' },
    ]

    const fileStructure = {
      all: [
        {
          name: 'Form i-140 Questionnaire',
          path: 'i_140.docx',
          type: 'docx',
        },
        {
          name: 'CASE MANAGER GUIDE ADVANCED DEGREE REQUIREMENT',
          path: 'CASE MANAGER GUIDE ADVANCED DEGREE REQUIREMENT.docx',
          type: 'docx',
        },
        {
          name: 'CASE MANAGER GUIDE ADVANCED DEGREE REQUIREMENT',
          path: 'CASE MANAGER GUIDE ADVANCED DEGREE REQUIREMENT.docx',
          type: 'docx',
        },
        {
          name: 'Chapter 2 - Extraordinary Ability',
          path: 'Chapter 2 - Extraordinary Ability.docx',
          type: 'docx',
        },
        {
          name: 'Chapter 3 - Outstanding Professor or Researcher',
          path: 'Chapter 3 - Outstanding Professor or Researcher.docx',
          type: 'docx',
        },
        {
          name: 'Chapter 5 - Advanced Degree or Exceptional Ability',
          path: 'Chapter 5 - Advanced Degree or Exceptional Ability.docx',
          type: 'docx',
        },
      ],
      personal: [
        { name: 'Personal Information Guide', path: 'i_140.pdf', type: 'pdf' },
        { name: 'Information Checklist', path: 'i_140.docx', type: 'docx' },
      ],
      education: [
        { name: 'Education Documentation Guide', path: 'education/guide.pdf', type: 'pdf' },
        { name: 'Transcript Review Template', path: 'education/template.docx', type: 'docx' },
      ],
      employment: [
        { name: 'Employment Verification Guide', path: 'employment/guide.pdf', type: 'pdf' },
        { name: 'Experience Assessment Form', path: 'employment/assessment.docx', type: 'docx' },
      ],
      abilities: [
        { name: 'Extraordinary Abilities Guide', path: 'abilities/guide.pdf', type: 'pdf' },
        { name: 'Evidence Checklist', path: 'abilities/checklist.docx', type: 'docx' },
      ],
      recommendations: [
        { name: 'Recommendation Letters Guide', path: 'recommendations/guide.pdf', type: 'pdf' },
        { name: 'Letter Review Template', path: 'recommendations/template.docx', type: 'docx' },
      ],
      documents: [
        { name: 'Supporting Documents Guide', path: 'documents/guide.pdf', type: 'pdf' },
        { name: 'Document Checklist', path: 'documents/checklist.docx', type: 'docx' },
      ],
    }

    const getComponentFiles = (component) => {
      return fileStructure[component] || []
    }

    const downloadGuideDoc = async (filePath) => {
      loading.value = true
      currentFile.value = filePath

      try {
        const response = await api.get(`/api/onboarding-form/${filePath}`, {
          responseType: 'blob',
        })

        const filename = filePath.split('/').pop()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        $q.notify({
          type: 'positive',
          message: 'Guide document downloaded successfully',
        })
      } catch (error) {
        console.error('Download error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to download guide document',
        })
      } finally {
        loading.value = false
        currentFile.value = null
      }
    }

    onMounted(() => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))
        roleId.value = userData?.role_id || null
        console.log('User role ID:', roleId.value) // Debug log
      } catch (error) {
        console.error('Error getting role ID from localStorage:', error)
      }
    })

    return {
      roleId,
      loading,
      currentFile,
      selectedComponent,
      componentOptions,
      getComponentFiles,
      downloadGuideDoc,
    }
  },
}
</script>

<style lang="scss" scoped>
.welcome-card {
  background: #02943f;

  color: white;
}

.q-timeline {
  padding: 0;
}

.folder-structure {
  border: 1px solid $grey-4;
  border-radius: 4px;

  .q-item {
    transition: background-color 0.2s;

    &:hover {
      background: $grey-2;
    }
  }
}
</style>
