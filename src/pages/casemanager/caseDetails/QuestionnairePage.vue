<template>
  <div class="questionnaire-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">Questionnaire</div>
    </div>
    <QuestionnaireSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import QuestionnaireSection from '../components/sections/QuestionnaireSection.vue'

export default {
  name: 'QuestionnairePage',
  components: { QuestionnaireSection },
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
