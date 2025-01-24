<template>
  <div class="payments">
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- Payment Statistics Cards -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-positive text-white">
          <q-card-section>
            <div class="text-subtitle2">Total Revenue</div>
            <div class="text-h4">$45,250</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-warning text-white">
          <q-card-section>
            <div class="text-subtitle2">Pending Payments</div>
            <div class="text-h4">$12,800</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-info text-white">
          <q-card-section>
            <div class="text-subtitle2">This Month</div>
            <div class="text-h4">$8,420</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-subtitle2">Average Payment</div>
            <div class="text-h4">$2,450</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card>
      <q-table :rows="payments" :columns="columns" row-key="id" :filter="filter" :loading="loading">
        <template v-slot:top>
          <div class="row full-width items-center justify-between q-pa-sm">
            <div class="text-h6">Payment Transactions</div>
            <q-input
              v-model="filter"
              placeholder="Search Payments"
              dense
              outlined
              class="col-12 col-sm-4"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getPaymentStatusColor(props.row.status)" text-color="white" size="sm">
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-amount="props">
          <q-td :props="props"> ${{ props.row.amount.toFixed(2) }} </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PaymentsPage',
  setup() {
    const loading = ref(false)
    const filter = ref('')

    const columns = [
      { name: 'id', label: 'Transaction ID', field: 'id', sortable: true },
      { name: 'date', label: 'Date', field: 'date', sortable: true },
      { name: 'client', label: 'Client', field: 'client', sortable: true },
      { name: 'case_id', label: 'Case ID', field: 'case_id' },
      { name: 'amount', label: 'Amount', field: 'amount', sortable: true },
      { name: 'status', label: 'Status', field: 'status', sortable: true },
      { name: 'method', label: 'Payment Method', field: 'method' },
    ]

    const payments = [
      {
        id: 'TRX001',
        date: '2024-01-20',
        client: 'John Doe',
        case_id: 'C001',
        amount: 1500.0,
        status: 'Completed',
        method: 'Credit Card',
      },
      {
        id: 'TRX002',
        date: '2024-01-19',
        client: 'Jane Smith',
        case_id: 'C002',
        amount: 2000.0,
        status: 'Pending',
        method: 'Bank Transfer',
      },
    ]

    const getPaymentStatusColor = (status) => {
      const colors = {
        Completed: 'positive',
        Pending: 'warning',
        Failed: 'negative',
      }
      return colors[status] || 'grey'
    }

    return {
      loading,
      filter,
      columns,
      payments,
      getPaymentStatusColor,
    }
  },
}
</script>
