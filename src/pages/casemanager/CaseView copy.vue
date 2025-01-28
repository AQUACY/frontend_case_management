<template>
  <div class="case-view-container q-pa-md">
    <div class="row">
      <!-- Left Sidebar -->
      <div class="col-auto">
        <q-drawer
          v-model="leftDrawerOpen"
          bordered
          :width="280"
          :breakpoint="700"
          class="bg-white case-drawer"
          elevated
          behavior="desktop"
        >
          <q-scroll-area style="height: calc(100vh - 150px)">
            <q-list padding>
              <!-- Client Info Header -->
              <q-item-label header
                >My Order : {{ casesStore.currentCase?.order_number }}</q-item-label
              >

              <!-- Navigation Items -->
              <template v-for="(item, index) in menuItems" :key="index">
                <q-item
                  clickable
                  v-ripple
                  :active="currentSection === item.value"
                  @click="currentSection = item.value"
                >
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-scroll-area>
        </q-drawer>
      </div>

      <!-- Main Content -->
      <div class="col">
        <div class="main-content">
          <!-- Top Navigation Bar -->
          <div class="row items-center q-mb-lg">
            <q-btn
              flat
              dense
              round
              icon="menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
              class="q-mr-sm lt-md"
            />
            <q-btn icon="arrow_back" flat round @click="router.back()" />
            <div class="text-h6 q-ml-sm">Case Details</div>
          </div>

          <!-- Tab Navigation -->
          <div class="q-mb-md">
            <q-separator />
          </div>

          <!-- Content Area -->
          <div v-if="casesStore.isLoading">
            <q-spinner-dots size="40px" class="q-ma-md" />
            <div class="text-grey">Loading case details...</div>
          </div>

          <div class="content-section">
            <ClientRecordSection v-if="currentSection === 'client-record'" />
            <MyProfileSection v-else-if="currentSection === 'my-profile'" />
            <ProposedEmploymentSection v-else-if="currentSection === 'proposed-employment'" />
            <ReferrersSection v-else-if="currentSection === 'referrers'" />
            <SocSection v-else-if="currentSection === 'soc'" />
            <PublicationRecordsSection v-else-if="currentSection === 'publication-records'" />
            <DocumentsSection v-else-if="currentSection === 'documents'" />
            <I485Section v-else-if="currentSection === 'i485'" />
            <MessagesSection v-else-if="currentSection === 'messages'" />
            <CasePreparationSection v-else-if="currentSection === 'case-preparation'" />
            <QuestionnaireSection v-else-if="currentSection === 'questionnaire'" />
            <PackageTrackingSection v-else-if="currentSection === 'package-tracking'" />
          </div>

          <!-- <div  class="text-center q-pa-md">
            <q-icon name="error_outline" size="40px" color="negative" />
            <div class="text-h6 q-mt-md">Case not found</div>
            <q-btn color="primary" label="Back to Cases" @click="router.back()" class="q-mt-md" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCasesStore } from 'stores/casemanager/casesStore'
import ClientRecordSection from './components/sections/ClientRecordSection.vue'
import MyProfileSection from './components/sections/MyProfileSection.vue'
import ProposedEmploymentSection from './components/sections/ProposedEmploymentSection.vue'
import ReferrersSection from './components/sections/ReferrersSection.vue'
// import SocSection from './components/sections/SocSection.vue'
import PublicationRecordsSection from './components/sections/PublicationRecordsSection.vue'
import DocumentsSection from './components/sections/DocumentsSection.vue'
import I485Section from './components/sections/I485Section.vue'
import MessagesSection from './components/sections/MessagesSection.vue'
import CasePreparationSection from './components/sections/CasePreparationSection.vue'
import QuestionnaireSection from './components/sections/QuestionnaireSection.vue'
// import PackageTrackingSection from './components/sections/PackageTrackingSection.vue'

export default {
  name: 'CaseView',
  components: {
    ClientRecordSection,
    MyProfileSection,
    ProposedEmploymentSection,
    ReferrersSection,
    // SocSection,
    PublicationRecordsSection,
    DocumentsSection,
    I485Section,
    MessagesSection,
    CasePreparationSection,
    QuestionnaireSection,
    // PackageTrackingSection,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const casesStore = useCasesStore()
    const activeTab = ref('reminders')
    const leftDrawerOpen = ref(true)
    const currentSection = ref('client-record')

    const menuItems = [
      { label: 'Client Record', value: 'client-record' },
      { label: 'My Profile', value: 'my-profile' },
      { label: 'Proposed Employment/Proposed Endeavor', value: 'proposed-employment' },
      { label: 'Referrers', value: 'referrers' },
      { label: 'Summary of Contributions (SOC)', value: 'soc' },
      { label: 'Publication Records', value: 'publication-records' },
      { label: 'Documents', value: 'documents' },
      { label: 'I-485', value: 'i485' },
      { label: 'Messages', value: 'messages' },
      { label: 'Case Preparation', value: 'case-preparation' },
      { label: 'Questionnaire', value: 'questionnaire' },
      { label: 'Package Tracking', value: 'package-tracking' },
    ]

    onMounted(async () => {
      const caseId = route.params.id
      await casesStore.fetchCaseDetails(caseId)
    })

    return {
      casesStore,
      router,
      activeTab,
      leftDrawerOpen,
      currentSection,
      menuItems,
    }
  },
}
</script>

<style lang="scss" scoped>
.case-view-container {
  height: calc(100vh - 50px); // Adjust based on your header height
  position: relative;
  overflow: hidden;
}

.case-drawer {
  position: fixed;
  height: calc(100vh - 50px);
  top: 50px; // Adjust based on your header height
  left: 0;
  z-index: 1000;
}

.main-content {
  height: 100%;
  overflow-y: auto;
  padding-left: 280px; // Width of drawer

  @media (max-width: 1023px) {
    padding-left: 0;
  }
}

.content-section {
  padding: 16px;
}

.q-drawer {
  .q-item {
    border-radius: 0 32px 32px 0;
    &.q-item--active {
      color: #1976d2;
      background: #e3f2fd;
    }
  }
}

// Hide menu button on desktop
.lt-md {
  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
