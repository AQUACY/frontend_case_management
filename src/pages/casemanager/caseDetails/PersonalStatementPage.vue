<template>
  <div class="personal-statement-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Personal Statement</div>
    </div>
    <PersonalStatement :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import PersonalStatement from '../components/sections/PersonalStatementSection.vue'

export default {
  name: 'PersonalStatementPage',
  components: { PersonalStatement },
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
