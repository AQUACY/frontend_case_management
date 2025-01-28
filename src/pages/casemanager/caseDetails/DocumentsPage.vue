<template>
  <div class="documents-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Documents</div>
    </div>
    <DocumentsSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import DocumentsSection from '../components/sections/DocumentsSection.vue'

export default {
  name: 'DocumentsPage',
  components: { DocumentsSection },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const caseId = route.params.id

    return {
      caseId,
      router
    }
  }
}
</script> 