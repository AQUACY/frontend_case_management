<template>
  <q-layout view="hHh LpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Case Manager Portal </q-toolbar-title>

        <div class="q-gutter-sm">
          <q-btn round flat icon="notifications">
            <q-badge color="red" floating> 2 </q-badge>
          </q-btn>

          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
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
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
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
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/casemanager" />
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CaseManagerLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const route = useRoute()

    const links = [
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
      breadcrumbs,
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
  background: linear-gradient(to right, $primary, darken($primary, 10%));
}
</style>
