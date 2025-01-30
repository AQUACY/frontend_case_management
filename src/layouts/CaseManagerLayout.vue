<template>
  <q-layout view="hHh LpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-green text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Case Manager Portal </q-toolbar-title>

        <div class="q-gutter-sm" v-if="currentUser">
          <q-btn round flat>
            <q-avatar size="26px">
              <div
                class="text-center bg-white text-green"
                style="width: 26px; height: 26px; line-height: 26px"
              >
                {{ getUserInitials }}
              </div>
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <q-item v-for="link in links" :key="link.title" :to="link.link" clickable v-ripple>
          <q-item-section avatar class="text-green">
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section :class="{ 'text-green': $route.path === link.link }">
            {{ link.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <div class="q-pa-md">
        <!-- Breadcrumb -->
        <div class="row items-center q-mb-lg">
          <q-breadcrumbs class="text-green">
            <q-breadcrumbs-el icon="home" to="/casemanager" class="text-green" />
            <q-breadcrumbs-el
              v-for="crumb in breadcrumbs"
              :key="crumb.label"
              :label="crumb.label"
              :to="crumb.to"
            />
          </q-breadcrumbs>
        </div>

        <!-- Page Content -->
        <router-view />
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-subtitle2">Case Manager Portal</div>
          <div class="text-caption">© 2025 All Rights Reserved</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'CaseManagerLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    const currentUser = ref(null)
    const role_id = ref(null)
    const newrole_id  = JSON.parse(localStorage.getItem('user')).role_id

    // Safely get user data with error handling
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : null
      } catch (error) {
        console.error('Error parsing user data:', error)
        return null
      }
    }

    // Computed property for user initials
    const getUserInitials = computed(() => {
      if (!currentUser.value || !currentUser.value.name) return ''
      return currentUser.value.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    })

    // Check authentication
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const user = getUserData()

      if (!token || !user || !user.role_id) {
        console.log('No token or user data found, redirecting to login')
        router.push('/casemanager/login')
        return false
      }

      currentUser.value = user
      role_id.value = user.role_id
      return true
    }

    onBeforeMount(() => {
      checkAuth()
    })

    // Watch for route changes
    router.beforeEach((to, from, next) => {
      if (to.path === '/casemanager/login') {
        next()
      } else if (!checkAuth()) {
        next('/casemanager/login')
      } else {
        next()
      }
    })

    const logout = async () => {
      try {
        $q.loading.show({
          spinner: 'QSpinnerGears',
          spinnerColor: 'primary',
          message: 'Logging out...',
        })

        await api.post('/api/auth/logout')
        localStorage.clear()

        if (window.Echo) {
          window.Echo.disconnect()
        }

        $q.notify({
          type: 'positive',
          message: 'Logged out successfully',
          position: 'top',
          timeout: 2000,
        })

        $q.loading.hide()
        currentUser.value = null
        role_id.value = null
        await router.push('/casemanager/login')
      } catch (error) {
        console.error('Logout error:', error)

        $q.notify({
          type: 'negative',
          message: 'Error logging out',
          position: 'top',
          timeout: 2000,
        })

        $q.loading.hide()
      }
    }

    const links =
      newrole_id === 2
        ? [
            {
              title: 'Dashboard',
              icon: 'dashboard',
              link: '/casemanager',
            },
            {
              title: 'Cases',
              icon: 'work',
              link: '/casemanager/cases',
            },
            {
              title: 'Clients',
              icon: 'people',
              link: '/casemanager/clients',
            },
            {
              title: 'Payments',
              icon: 'payments',
              link: '/casemanager/payments',
            },
            {
              title: 'Documents',
              icon: 'folder',
              link: '/casemanager/documents',
            },
            {
              title: 'Calendar',
              icon: 'event',
              link: '/casemanager/calendar',
            },
            {
              title: 'Reports',
              icon: 'assessment',
              link: '/casemanager/reports',
            },
            {
              title: 'Settings',
              icon: 'settings',
              link: '/casemanager/settings',
            },
          ]
        : newrole_id === 3
          ? [
              {
                title: 'Dashboard',
                icon: 'dashboard',
                link: '/casemanager',
              },
              {
                title: 'Cases',
                icon: 'work',
                link: '/casemanager/cases',
              },
              {
                title: 'Documents',
                icon: 'folder',
                link: '/casemanager/documents',
              },
              {
                title: 'Calendar',
                icon: 'event',
                link: '/casemanager/calendar',
              },
              {
                title: 'Settings',
                icon: 'settings',
                link: '/casemanager/settings',
              },
            ]
          : []

    // Dynamic breadcrumbs based on current route
    const breadcrumbs = computed(() => {
      const path = route.path.split('/')
      const crumbs = []
      let currentPath = ''

      path.forEach((segment, index) => {
        if (segment && index > 1) {
          // Skip empty and 'casemanager' segments
          currentPath += `/${segment}`
          crumbs.push({
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            to: `/casemanager${currentPath}`,
          })
        }
      })

      return crumbs
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      links,
      role_id,
      currentUser,
      getUserInitials,
      breadcrumbs,
      logout,
    }
  },
}
</script>

<style lang="scss" scoped>
.q-drawer {
  background: #f5f5f5;

  .q-item {
    border-radius: 0 24px 24px 0;
    margin-right: 12px;
    margin-bottom: 4px;

    &.q-router-link-active {
      background: $primary;
      color: white;

      .q-icon {
        color: white;
      }
    }
  }
}

.q-footer {
  background: linear-gradient(to right, $primary);
}
</style>
