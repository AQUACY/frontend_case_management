const routes = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/client/announcement',
        component: () => import('src/pages/client/AnnouncementView.vue'),
      },
      { path: '/client/overview', component: () => import('src/pages/client/OverView.vue') },
      {
        path: '/client/clientrecord',
        component: () => import('src/pages/client/ClientRecord.vue'),
      },
      {
        path: '/client/profile',
        component: () => import('src/pages/client/MyProfile.vue'),
      },
      {
        path: '/client/referrers',
        component: () => import('src/pages/client/RecommenderView.vue'),
      },
      {
        path: '/client/pubrecords',
        component: () => import('src/pages/client/PublicationRecord.vue'),
      },
      {
        path: '/client/documents',
        component: () => import('src/pages/client/DocumentView.vue'),
      },
      {
        path: '/client/i-485',
        component: () => import('src/pages/client/i-485View.vue'),
      },
      {
        path: '/client/messages',
        component: () => import('src/pages/client/MessagesView.vue'),
      },
      {
        path: '/client/casepreparation',
        component: () => import('src/pages/client/CasePreparation.vue'),
      },
      {
        path: '/client/questionnaire',
        component: () => import('src/pages/client/QuestionnaireView.vue'),
      },
      {
        path: '/client/soc',
        component: () => import('src/pages/client/SummaryofContribution.vue'),
      },
      {
        path: '/client/popendeavor',
        component: () => import('src/pages/client/ProposedEndavorRecord.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginView.vue') },
      // { path: '/login', component: () => import('pages/LoginView.vue') }
    ],
  },
  {
    path: '/casemanager/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/casemanager/LoginView.vue') },
      // { path: '/login', component: () => import('pages/LoginView.vue') }
    ],
  },
  {
    path: '/casemanager',
    component: () => import('layouts/CaseManagerLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/casemanager/dashboard',
      },
      {
        path: 'dashboard',
        name: 'casemanager-dashboard',
        component: () => import('pages/casemanager/DashboardPage.vue'),
      },
      {
        path: 'cases',
        name: 'casemanager-cases',
        component: () => import('pages/casemanager/CasesPage.vue'),
      },
      {
        path: 'clients',
        name: 'casemanager-clients',
        component: () => import('pages/casemanager/ClientsPage.vue'),
      },
      {
        path: 'payments',
        name: 'casemanager-payments',
        component: () => import('pages/casemanager/PaymentsPage.vue'),
      },
      {
        path: 'documents',
        name: 'casemanager-documents',
        component: () => import('pages/casemanager/DocumentsPage.vue'),
      },
      {
        path: 'calendar',
        name: 'casemanager-calendar',
        component: () => import('pages/casemanager/CalendarPage.vue'),
      },
      {
        path: 'reports',
        name: 'casemanager-reports',
        component: () => import('pages/casemanager/ReportsPage.vue'),
      },
      {
        path: 'settings',
        name: 'casemanager-settings',
        component: () => import('pages/casemanager/SettingsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
