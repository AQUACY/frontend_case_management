<template>
  <div class="q-pa-md">
    <q-card flat>
      <PaymentHistoryTable />
    </q-card>
  </div>
</template>

<script>
import PaymentHistoryTable from 'src/components/PaymentHistoryTable.vue'
export default {
  components: {
    PaymentHistoryTable,
  },
  setup() {},
}
</script>
