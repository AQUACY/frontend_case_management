<template>
  <div class="i485-section">
    <div class="text-h6 q-mb-md">I-485 Application</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Status Overview -->
          <div class="col-12 col-md-4">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Application Status</div>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Current Status</q-item-label>
                      <q-item-label>
                        <q-chip
                          :color="getStatusColor(i485Details.status)"
                          text-color="white"
                        >
                          {{ i485Details.status }}
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Receipt Number</q-item-label>
                      <q-item-label>{{ i485Details.receipt_number }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>Filing Date</q-item-label>
                      <q-item-label>{{ formatDate(i485Details.filing_date) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- Timeline -->
          <div class="col-12 col-md-8">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Application Timeline</div>
                <q-timeline color="primary">
                  <q-timeline-entry
                    v-for="event in i485Details.timeline"
                    :key="event.id"
                    :title="event.title"
                    :subtitle="formatDate(event.date)"
                    :color="event.color"
                  >
                    <div>{{ event.description }}</div>
                  </q-timeline-entry>
                </q-timeline>
              </q-card-section>
            </q-card>
          </div>

          <!-- Required Documents -->
          <div class="col-12">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Required Documents</div>
                <q-list separator>
                  <q-item v-for="doc in i485Details.required_documents" :key="doc.id">
                    <q-item-section>
                      <q-item-label>{{ doc.name }}</q-item-label>
                      <q-item-label caption>{{ doc.description }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-chip
                        :color="doc.submitted ? 'positive' : 'warning'"
                        text-color="white"
                        size="sm"
                      >
                        {{ doc.submitted ? 'Submitted' : 'Pending' }}
                      </q-chip>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- Additional Information -->
          <div class="col-12">
            <q-card bordered flat>
              <q-card-section>
                <div class="text-subtitle1">Additional Information</div>
                <q-list>
                  <q-item v-for="(info, index) in i485Details.additional_info" :key="index">
                    <q-item-section>
                      <q-item-label caption>{{ info.label }}</q-item-label>
                      <q-item-label>{{ info.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
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
  name: 'I485Section',
  props: {
    i485Details: {
      type: Object,
      required: true,
      default: () => ({
        status: '',
        receipt_number: '',
        filing_date: null,
        timeline: [],
        required_documents: [],
        additional_info: []
      })
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getStatusColor(status) {
      const colors = {
        'pending': 'orange',
        'approved': 'positive',
        'rejected': 'negative',
        'review': 'info',
        'rfe_issued': 'warning'
      }
      return colors[status?.toLowerCase()] || 'grey'
    }
  }
}
</script> 
