<template>
  <q-layout view="hHh Lpr lff" class="rounded-borders">
    <q-header elevated class="bg-white text-green">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-pl-xl">
          <q-img src="~assets/favicon.png" width="40px" height="40px" />
        </q-avatar>
        <q-toolbar-title class="q-pl-xl q-pt-sm text-bold">
          GreenPath Client Portal
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
        <q-btn
          flat
          dense
          round
          icon="list"
          aria-label="Case Status"
          @click="rightDrawerOpen = !rightDrawerOpen"
        >
          <q-tooltip>Toggle Case Status</q-tooltip>
        </q-btn>
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

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="300"
      class="bg-white"
      v-if="currentUser && caseDetails"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6 text-green q-mb-md">
            <q-icon name="folder" class="q-mr-sm" />
            Case Status
          </div>

          <q-list padding class="case-status-list">
            <template v-for="status in caseStatuses" :key="status.id">
              <q-card flat bordered class="q-mb-sm">
                <q-card-section>
                  <div class="text-subtitle2 text-weight-bold text-green">
                    {{ status.service_type }}
                  </div>
                  <div class="q-mt-sm">
                    <a :href="`https://egov.uscis.gov`" target="_blank" class="receipt-link">
                      {{ status.receipt_number }}
                    </a>
                    <q-btn
                      flat
                      dense
                      round
                      icon="content_copy"
                      size="sm"
                      class="q-ml-sm"
                      @click="() => copyToClipboard(status.receipt_number)"
                    >
                      <q-tooltip>Copy receipt number</q-tooltip>
                    </q-btn>
                  </div>
                  <div class="text-caption q-mt-sm">
                    <template v-if="status.date_of_filing">
                      Filed: {{ formatDate(status.date_of_filing) }}
                    </template>
                    <template v-if="status.date_of_decision">
                      <br />Decision: {{ formatDate(status.date_of_decision) }}
                    </template>
                  </div>
                  <div class="q-mt-sm"></div>
                </q-card-section>
              </q-card>
            </template>
          </q-list>
        </div>
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
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useAnnouncementStore } from 'stores/announcement'
import EssentialLink from 'components/EssentialLink.vue'
import CustomCarousel from 'components/CustomCarousel.vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { date } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const announcementStore = useAnnouncementStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(true)
const currentUser = ref(null)
const caseDetails = ref(null)
const caseStatuses = ref([])
const loading = ref(false)

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
    title: 'News & Update',
    caption: '',
    link: '/client/news-update',
  },
  {
    title: 'Overview',
    caption: '',
    link: '/client/overview',
  },
  {
    title: 'Form I-140 Questionnaire',
    caption: '',
    icon: '',
    link: '/client/form-questionnaire',
  },
  {
    title: 'Education & Professional Experience',
    caption: '',
    icon: '',
    link: '/client/experience',
  },
  {
    title: 'Research Summary',
    caption: '',
    icon: '',
    link: '/client/research-summary',
  },
  {
    title: 'Proposed Endeavor',
    caption: '',
    link: '/client/popendeavor',
  },
  {
    title: 'Publication & Editorial Record',
    caption: '',
    link: '/client/pubrecords',
  },
  {
    title: 'Evidence of Extraordinary Ability',
    caption: '',
    link: '/client/extraordinary-ability',
  },
  {
    title: 'Recommendation Letters',
    caption: '',
    link: '/client/referrers',
  },
  {
    title: 'Personal Statement',
    caption: '',
    link: '/client/personal-statement',
  },
  // {
  //   title: 'My Profile',
  //   caption: '',
  //   link: '/client/profile',
  // },

  // {
  //   title: 'Summary of Contributions (SOC)',
  //   caption: '',
  //   icon: '',
  //   link: '/client/soc',
  // },
  // {
  //   title: 'Pubilcation Records',
  //   caption: '',
  //   icon: '',
  //   link: '/client/pubrecords',
  // },
  {
    title: 'Documents',
    caption: '',
    icon: '',
    link: '/client/documents',
  },
  // {
  //   title: 'I-485',
  //   caption: '',
  //   icon: '',
  //   link: '/client/i-485',
  // },
  {
    title: 'Case Preparation',
    caption: '',
    icon: '',
    link: '/client/casepreparation',
  },
  {
    title: 'Billing',
    caption: '',
    icon: '',
    link: '/client/billing',
  },
  {
    title: 'Messages',
    caption: '',
    icon: '',
    link: '/client/messages',
  },
  {
    title: 'VISA FAQ',
    caption: '',
    icon: '',
    link: '/client/visa-faq',
  },
  {
    title: 'Tracking',
    caption: '',
    icon: '',
    link: '/client/packagetracking',
  },
]

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return ''
  return date.formatDate(dateString, 'MMM D, YYYY')
}

// Get status color helper
// const getStatusColor = (status) => {
//   const colors = {
//     'Case Filed': 'primary',
//     Pending: 'warning',
//     Inactive: 'grey',
//     Approved: 'positive',
//     Denied: 'negative',
//   }
//   return colors[status] || 'grey'
// }

// Get case ID from localStorage
const getCaseId = () => {
  try {
    const caseData = localStorage.getItem('caseDetails')
    if (!caseData) return null

    const parsedData = JSON.parse(caseData)
    return parsedData?.data?.id
  } catch (error) {
    console.error('Error parsing case details:', error)
    return null
  }
}

// Fetch case statuses
const fetchCaseStatuses = async () => {
  const currentCaseId = getCaseId()
  if (!currentCaseId) {
    console.log('No case ID found')
    return
  }

  loading.value = true
  try {
    console.log('Fetching case statuses for ID:', currentCaseId)
    const response = await api.get(`/api/auth/case/${currentCaseId}/statuses`)
    console.log('API Response:', response.data)

    if (response.data.success) {
      caseStatuses.value = response.data.data
      console.log('Case statuses loaded:', caseStatuses.value)
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.error('Error fetching case statuses:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to load case statuses',
      position: 'top',
    })
    caseStatuses.value = []
  } finally {
    loading.value = false
  }
}

// Watch for changes in localStorage
watch(
  () => localStorage.getItem('caseDetails'),
  (newValue) => {
    console.log('Case details changed in localStorage:', newValue)
    if (newValue) {
      fetchCaseStatuses()
    } else {
      caseStatuses.value = []
    }
  },
  { immediate: true }, // This will trigger the watch immediately on setup
)

// Initial fetch on mount with a slight delay to ensure localStorage is populated
onMounted(() => {
  setTimeout(() => {
    fetchCaseStatuses()
  }, 500)
})

// Add this copy method
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    $q.notify({
      message: 'Receipt number copied to clipboard',
      color: 'positive',
      position: 'top',
      timeout: 1000,
    })
  } catch (err) {
    console.error('Failed to copy:', err)
    // Fallback copy method
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      $q.notify({
        message: 'Receipt number copied to clipboard',
        color: 'positive',
        position: 'top',
        timeout: 1000,
      })
    } catch (err) {
      console.error('Fallback copy failed:', err)
      $q.notify({
        message: 'Failed to copy receipt number',
        color: 'negative',
        position: 'top',
      })
    }
    document.body.removeChild(textArea)
  }
}
</script>

<style lang="scss" scoped>
.case-status-list {
  .receipt-link {
    color: #1976d2;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

.q-card {
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
