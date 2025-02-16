<template>
  <div class="extraordinary-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Extraordinary Abilities</div>
    </div>
    <ExtraordinaryAbilitiesSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import ExtraordinaryAbilitiesSection from '../components/sections/ExtraordinaryAbilitiesSection.vue'

export default {
  name: 'ExtraOrdinaryPage',
  components: { ExtraordinaryAbilitiesSection },
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
