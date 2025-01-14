<template>
  <q-layout view="hHh Lpr lff" class="rounded-borders">
    <q-header elevated class="">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="topbar">
          <q-btn flat label="My Order" @click="goTo('announcements')" />
          <q-btn flat label="Our Team" @click="goTo('announcements')" />
          <q-btn flat label="Feedback" @click="goTo('feedback')" />
          <q-btn flat label="Calculator" @click="goTo('calculator')" />
        </q-toolbar-title>
        <p>{{ users.name }}</p>
        <q-avatar>
          <img src="https://via.placeholder.com/32" alt="Profile" />
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header>
            My Order : <b>{{ cases.data.order_number }}</b>
          </q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <div class="announcements-container">
        <CustomCarousel :announcements="announcementStore.announcements" />
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useAnnouncementStore } from 'stores/announcement'
import EssentialLink from 'components/EssentialLink.vue'
import CustomCarousel from 'components/CustomCarousel.vue'

const users = JSON.parse(localStorage.getItem('user'))
const cases = JSON.parse(localStorage.getItem('caseDetails'))
const leftDrawerOpen = ref(false)
const announcementStore = useAnnouncementStore()

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
    title: 'Proposed Employment/Proposed Endeavor',
    caption: '',
    link: '/client/popendeavor',
  },
  {
    title: 'Recommenders',
    caption: '',
    link: '/client/recommenders',
  },
  {
    title: 'SOC (Summary of Contributions)',
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
onMounted(() => {
  announcementStore.fetchAnnouncements()
})
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.topbar {
  margin-left: 20%;
}
.announcements-container {
  margin-top: -20px;
}
</style>
