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
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'CaseManagerGuidePage',

  setup() {
    const roleId = ref(null)

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
</style>
