<template>
  <div class="extraordinary-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Recommendation Letters</div>
    </div>
    <Recommenders :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import Recommenders from '../components/sections/RecommendationLettersSection.vue'

export default {
  name: 'RecommendersPage',
  components: { Recommenders },
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
