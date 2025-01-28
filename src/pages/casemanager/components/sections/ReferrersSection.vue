<template>
  <div class="referrers-section">
    <div class="text-h6 q-mb-md">Referrers</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-table
              :rows="referrers"
              :columns="columns"
              row-key="id"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip :color="getStatusColor(props.row.status)" text-color="white" size="sm">
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn-group flat>
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="primary"
                      icon="visibility"
                      @click="viewReferrer(props.row)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="secondary"
                      icon="mail"
                      @click="contactReferrer(props.row)"
                    />
                  </q-btn-group>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ReferrersSection',
  props: {
    referrers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: 'institution',
          align: 'left',
          label: 'Institution',
          field: (row) => row.institution,
          sortable: true,
        },
        {
          name: 'position',
          align: 'left',
          label: 'Position',
          field: (row) => row.position,
          sortable: true,
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: (row) => row.status,
          sortable: true,
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions',
          field: (row) => row.id,
        },
      ],
    }
  },
  methods: {
    getStatusColor(status) {
      const colors = {
        pending: 'orange',
        completed: 'positive',
        declined: 'negative',
        in_progress: 'info',
      }
      return colors[status.toLowerCase()] || 'grey'
    },
    viewReferrer(referrer) {
      // Implement view referrer details
      console.log('View referrer:', referrer)
    },
    contactReferrer(referrer) {
      // Implement contact referrer
      console.log('Contact referrer:', referrer)
    },
  },
}
</script>
