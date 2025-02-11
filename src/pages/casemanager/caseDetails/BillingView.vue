<template>
  <div>
    <div class="q-pa-md">
      <q-btn
        icon="arrow_back"
        flat
        :to="`/casemanager/cases/${$route.params.id}`"
        color="primary"
        label="Back to Case"
      />
    </div>
    <PaymentHistoryTable />
  </div>
</template>


<script>
import PaymentHistoryTable from 'src/components/PaymentHistoryTables.vue'
export default {
  name: 'BillingView',
  components: {
    PaymentHistoryTable,
  },
}
</script>
