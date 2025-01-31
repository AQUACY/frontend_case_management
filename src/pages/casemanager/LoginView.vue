<template>
  <q-page class="flex flex-center" style="background-color: #8bc34a">
    <div class="login-container">
      <div class="text-center">
        <img src="/src/assets/logo.png" alt="Application Logo" class="logo" />
      </div>
      <q-card class="login-card rounded q-pa-lg">
        <q-card-section class="text-center">
          <div v-if="loading">
            <q-spinner size="50px" color="primary" />
            <p>Loading...</p>
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">
            <q-input outlined v-model="email" type="email" label="Email" required class="q-pb-md" />
            <q-input
              outlined
              v-model="password"
              type="password"
              label="Password"
              required
              class="q-pb-md"
            />
            <q-btn type="submit" label="Log in" color="green-10" class="full-width" />
          </q-form>
        </q-card-section>

        <q-card-actions align="center" class="column">
          <q-btn flat label="Lost your password?" class="text-green-10" />
          <div class="text-caption q-mt-md">
            Need technical assistance? <br />Contact the Technical Support Administrator -
            <a href="mailto:tech_support@wenzo.com" class="text-primary">tech_support@wenzo.com</a>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
export default {
  setup() {
    const userStore = useUserStore()
    const $q = useQuasar()

    return {
      userStore,
      $q,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      try {
        const response = await this.$api.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        })

        const token = response.data.data.access_token

        // Store data in Pinia store and local storage
        this.userStore.setToken(token)

        console.log(response.data.data.access_token)

        // get the user details to the localstorage
        if (response.data.success === true) {
          const userprofile = await this.$api.get('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          const user = userprofile.data.data
          this.userStore.setUser(user)
          localStorage.setItem('user_id', user.id)
        } else {
          this.$q.notify({
            message: 'User Could not be loaded',
            color: 'negative',
          })
        }
        this.$router.push('/casemanager/guide')
      } catch (error) {
        console.error('Login failed', error)
        this.$q.notify({
          message: 'Login Failed',
          color: 'negative',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.login-container {
  width: 100%;
  max-width: 500px;
  padding: 5px;
}
.login-card {
  width: 100%;
  background-color: white;
}
.logo {
  width: 70%;
  margin-bottom: -70px;
}
.full-width {
  width: 100%;
}
</style>
