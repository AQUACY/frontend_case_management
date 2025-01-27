<template>
  <div class="publication-records-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Publication Records</div>
    </div>
    <PublicationRecordsSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import PublicationRecordsSection from '../components/sections/PublicationRecordsSection.vue'

export default {
  name: 'PublicationRecordsPage',
  components: { PublicationRecordsSection },
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
