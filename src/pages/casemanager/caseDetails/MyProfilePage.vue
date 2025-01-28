<template>
  <div class="my-profile-page">
    <div class="row items-center q-mb-md">
      <q-btn icon="arrow_back" flat round @click="router.back()" />
      <div class="text-h6 q-ml-sm">My Profile</div>
    </div>
    <ProfileSection :case-id="caseId" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import ProfileSection from '../components/sections/ProfileSection.vue'

export default {
  name: 'MyProfilePage',
  components: { ProfileSection },
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
