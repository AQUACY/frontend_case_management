<template>
  <q-page class="flex flex-center">
    <img
      alt="Green Path Case Manager Logo"
      src="~assets/logo.png"
      style="width: 500px; height: 400px"
    />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Check if user is not logged in by looking for auth token
  const token = localStorage.getItem('token')
  if (!token) {
    // Redirect to login page if no token found
    router.push('/login')
  }
})

</script>
