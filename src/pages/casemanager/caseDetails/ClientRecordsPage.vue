<template>
  <div class="client-records-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Client Records</div>
    </div>
    <ClientRecordSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import ClientRecordSection from '../components/sections/ClientRecordSection.vue'

export default {
  name: 'ClientRecordsPage',
  components: { ClientRecordSection },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const caseId = route.params.id

    return {
      caseId,
      router,
    }
  },
}
</script>
