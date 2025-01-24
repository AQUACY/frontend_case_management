<template>
  <div class="reports">
    <div class="text-h6 q-mb-lg">Reports & Analytics</div>

    <!-- Report Types -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="trending_up" size="3em" color="primary" />
            <div class="text-h6 q-mt-sm">Case Analytics</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="payments" size="3em" color="positive" />
            <div class="text-h6 q-mt-sm">Financial Reports</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="people" size="3em" color="warning" />
            <div class="text-h6 q-mt-sm">Client Reports</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="cursor-pointer">
          <q-card-section class="text-center">
            <q-icon name="assessment" size="3em" color="info" />
            <div class="text-h6 q-mt-sm">Performance</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Report Generator -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md">Generate Report</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <q-select
              v-model="reportType"
              :options="reportTypes"
              label="Report Type"
              outlined
              dense
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="dateRange.from" type="date" label="From Date" outlined dense />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="dateRange.to" type="date" label="To Date" outlined dense />
          </div>
          <div class="col-12 col-md-3">
            <q-btn color="primary" icon="file_download" label="Generate" class="full-width" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Recent Reports -->
    <q-card>
      <q-table :rows="recentReports" :columns="columns" row-key="id" :loading="loading">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn flat round size="sm" color="primary" icon="visibility">
                <q-tooltip>View</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="secondary" icon="download">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="negative" icon="delete">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ReportsPage',
  setup() {
    const loading = ref(false)
    const reportType = ref(null)
    const dateRange = ref({
      from: '',
      to: '',
    })

    const reportTypes = [
      'Case Summary',
      'Financial Statement',
      'Client Activity',
      'Performance Metrics',
    ]

    const columns = [
      { name: 'name', label: 'Report Name', field: 'name', sortable: true },
      { name: 'type', label: 'Type', field: 'type', sortable: true },
      { name: 'generated', label: 'Generated Date', field: 'generated', sortable: true },
      { name: 'format', label: 'Format', field: 'format' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const recentReports = [
      {
        id: 1,
        name: 'Monthly Case Summary',
        type: 'Case Summary',
        generated: '2024-01-20',
        format: 'PDF',
      },
      {
        id: 2,
        name: 'Q4 Financial Report',
        type: 'Financial',
        generated: '2024-01-19',
        format: 'Excel',
      },
    ]

    return {
      loading,
      reportType,
      reportTypes,
      dateRange,
      columns,
      recentReports,
    }
  },
}
</script>
