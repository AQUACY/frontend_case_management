<template>
  <q-layout view="hHh Lpr lff" class="rounded-borders">
    <q-header elevated class="bg-white text-green">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-pl-xl">
          <q-img src="~assets/favicon.png" width="40px" height="40px" />
        </q-avatar>
        <q-toolbar-title class="q-pl-xl q-pt-sm text-bold">
          Greenpath Client Portal
        </q-toolbar-title>
        <!-- <q-toolbar-title class="topbar">
          <q-btn flat label="My Order" @click="goTo('announcements')" />
          <q-btn flat label="Our Team" @click="goTo('announcements')" />
          <q-btn flat label="Feedback" @click="goTo('feedback')" />
          <q-btn flat label="Calculator" @click="goTo('calculator')" />
        </q-toolbar-title> -->
        <div class="q-gutter-sm" v-if="currentUser">
          <q-btn round flat>
            <q-avatar size="26px">
              <div
                class="text-center bg-green text-white"
                style="width: 26px; height: 26px; line-height: 26px"
              >
                {{ getUserInitials }}
              </div>
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="goTo('profile')">Profile</q-item-section>
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
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      v-if="currentUser && caseDetails"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header>
            My Order: <b>{{ caseDetails.data?.order_number || 'N/A' }}</b>
          </q-item-label>
          <EssentialLink
            :class="{ 'text-green': $route.path === link.link }"
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="announcements-container" v-if="currentUser">
        <CustomCarousel :announcements="announcementStore.announcements" />
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useAnnouncementStore } from 'stores/announcement'
import EssentialLink from 'components/EssentialLink.vue'
import CustomCarousel from 'components/CustomCarousel.vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()
const announcementStore = useAnnouncementStore()
const leftDrawerOpen = ref(false)
const currentUser = ref(null)
const caseDetails = ref(null)

// Safely get user data
const getUserData = () => {
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Safely get case details
const getCaseDetails = () => {
  try {
    const caseData = localStorage.getItem('caseDetails')
    return caseData ? JSON.parse(caseData) : null
  } catch (error) {
    console.error('Error parsing case details:', error)
    return null
  }
}

const goTo = () => {
  router.push('/client/profile-settings')
}

// Computed property for user initials
const getUserInitials = computed(() => {
  if (!currentUser.value?.name) return ''
  return currentUser.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
})

// Check authentication
const checkAuth = () => {
  const token = localStorage.getItem('token')
  const user = getUserData()
  const cases = getCaseDetails()

  if (!token || !user) {
    console.log('No token or user data found, redirecting to login')
    router.push('/login')
    return false
  }

  currentUser.value = user
  caseDetails.value = cases
  return true
}

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (!checkAuth()) {
    next('/login')
  } else {
    next()
  }
})

onBeforeMount(() => {
  checkAuth()
  if (currentUser.value) {
    announcementStore.fetchAnnouncements()
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
    caseDetails.value = null
    await router.push('/login')
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

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// List of links to display
const linksList = [
  {
    title: 'Announcement',
    caption: '',
    link: '/client/announcement',
  },
  {
    title: 'Overview',
    caption: 'github.com/quasarframework',
    link: '/client/overview',
  },
  {
    title: 'Client Record',
    caption: '',
    link: '/client/clientrecord',
  },
  {
    title: 'My Profile',
    caption: '',
    link: '/client/profile',
  },
  {
    title: 'Proposed Endeavor',
    caption: '',
    link: '/client/popendeavor',
  },
  {
    title: 'Referrers',
    caption: '',
    link: '/client/referrers',
  },
  {
    title: 'Summary of Contributions (SOC)',
    caption: '',
    icon: '',
    link: '/client/soc',
  },
  {
    title: 'Pubilcation Records',
    caption: '',
    icon: '',
    link: '/client/pubrecords',
  },
  {
    title: 'Documents',
    caption: '',
    icon: '',
    link: '/client/documents',
  },
  {
    title: 'I-485',
    caption: '',
    icon: '',
    link: '/client/i-485',
  },
  {
    title: 'Messages',
    caption: '',
    icon: '',
    link: '/client/messages',
  },
  {
    title: 'Case Preparation',
    caption: '',
    icon: '',
    link: '/client/casepreparation',
  },
  {
    title: 'Questionnaire',
    caption: '',
    icon: '',
    link: '/client/questionnaire',
  },
  {
    title: 'Package Tracking',
    caption: '',
    icon: '',
    link: '/client/packagetracking',
  },
]
</script>

<style scoped>
.topbar {
  margin-left: 20%;
}
.announcements-container {
  margin-top: -20px;
}
</style>
