const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/client/news-update',
        component: () => import('src/pages/client/AnnouncementView.vue'),
        meta: {
          title: 'News & Update',
        },
      },
      {
        path: '/client/overview',
        component: () => import('src/pages/client/OverView.vue'),
        meta: {
          title: 'Welcome Note',
        },
      },
      {
        path: '/client/clientrecord',
        component: () => import('src/pages/client/ClientRecord.vue'),
        meta: {
          title: 'Client Records',
        },
      },
      {
        path: '/client/profile',
        component: () => import('src/pages/client/MyProfile.vue'),
        meta: {
          title: 'Client Profile',
        },
      },
      {
        path: '/client/referrers',
        component: () => import('src/pages/client/RecommenderView.vue'),
        meta: {
          title: 'Referrers',
        },
      },
      {
        path: '/client/pubrecords',
        component: () => import('src/pages/client/PublicationRecord.vue'),
        meta: {
          title: 'Publication Records',
        },
      },
      {
        path: '/client/documents',
        component: () => import('src/pages/client/DocumentView.vue'),
        meta: {
          title: 'Documents',
        },
      },
      {
        path: '/client/i-485',
        component: () => import('src/pages/client/i-485View.vue'),
        meta: {
          title: 'i-485',
        },
      },
      {
        path: '/client/messages',
        component: () => import('src/pages/client/MessagesViews.vue'),
        meta: {
          title: 'Messages',
        },
      },
      {
        path: '/client/casepreparation',
        component: () => import('src/pages/client/CasePreparation.vue'),
        meta: {
          title: 'Case Preparations',
        },
      },
      {
        path: '/client/form-questionnaire',
        component: () => import('src/pages/client/QuestionnaireView.vue'),
        meta: {
          title: 'Form I-140 Questionnaire',
        },
      },
      {
        path: '/client/experience',
        component: () => import('src/pages/client/ExperienceView.vue'),
        meta: {
          title: 'Education and Professional Experience',
        },
      },
      {
        path: '/client/research-summary',
        component: () => import('src/pages/client/ResearchSummaryView.vue'),
        meta: {
          title: 'Research Summary',
        },
      },
      {
        path: '/client/extraordinary-ability',
        component: () => import('src/pages/client/ExtraordinaryAbilityView.vue'),
        meta: {
          title: 'Extraordinary Ability',
        },
      },
      {
        path: '/client/personal-statement',
        component: () => import('src/pages/client/PersonalStatementView.vue'),
        meta: {
          title: 'Personal Statement',
        },
      },
      {
        path: '/client/soc',
        component: () => import('src/pages/client/SummaryofContribution.vue'),
        meta: {
          title: 'SOC',
        },
      },
      {
        path: '/client/popendeavor',
        component: () => import('src/pages/client/ProposedEndavorRecord.vue'),
        meta: {
          title: 'Endavor',
        },
      },
      {
        path: '/client/billing',
        component: () => import('src/pages/client/BillingView.vue'),
        meta: {
          title: 'Billing',
        },
      },
      {
        path: '/client/visa-faq',
        component: () => import('src/pages/client/VISA-Faq.vue'),
        meta: {
          title: 'VISA FAQ',
        },
      },
      {
        path: '/client/profile-settings',
        component: () => import('src/pages/client/SettingsPage.vue'),
        meta: {
          title: 'Profile Settings',
        },
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
  // case manager routes
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
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'cases',
        name: 'casemanager-cases',
        component: () => import('pages/casemanager/CasesPage.vue'),
        meta: {
          title: 'Cases',
        },
      },
      {
        path: 'users',
        name: 'casemanager-clients',
        component: () => import('pages/casemanager/ClientsPage.vue'),
        meta: {
          title: 'Clients',
        },
      },
      {
        path: 'payments',
        name: 'casemanager-payments',
        component: () => import('pages/casemanager/PaymentsPage.vue'),
        meta: {
          title: 'Payments',
        },
      },
      {
        path: '/case/:id/billing',
        name: 'casemanager-case-billing',
        component: () => import('pages/casemanager/caseDetails/BillingView.vue'),
        meta: {
          title: 'Billing',
        },
      },
      {
        path: 'documents',
        name: 'casemanager-documents',
        component: () => import('pages/casemanager/DocumentsPage.vue'),
        meta: {
          title: 'Documents',
        },
      },
      {
        path: 'calendar',
        name: 'casemanager-calendar',
        component: () => import('pages/casemanager/CalendarPage.vue'),
        meta: {
          title: 'Calendar',
        },
      },
      {
        path: 'reports',
        name: 'casemanager-reports',
        component: () => import('pages/casemanager/ReportsPage.vue'),
        meta: {
          title: 'Reports',
        },
      },
      {
        path: 'settings',
        name: 'casemanager-settings',
        component: () => import('pages/casemanager/SettingsPage.vue'),
        meta: {
          title: 'Settings',
        },
      },
      {
        path: 'cases/:id',
        name: 'casemanager-case',
        component: () => import('pages/casemanager/CaseView.vue'),
        meta: {
          title: 'Case',
        },
      },
      {
        path: '/case/:id/client-records',
        name: 'casemanager-case-client-records',
        component: () => import('pages/casemanager/caseDetails/ClientRecordsPage.vue'),
        meta: {
          title: 'Client Records',
        },
      },
      {
        path: '/case/:id/documents',
        name: 'casemanager-case-documents',
        component: () => import('pages/casemanager/caseDetails/DocumentsPage.vue'),
      },
      {
        path: '/case/:id/profile',
        component: () => import('pages/casemanager/caseDetails/MyProfilePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/publications',
        component: () => import('pages/casemanager/caseDetails/PublicationRecordsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/questionnaire',
        component: () => import('pages/casemanager/caseDetails/QuestionnairePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/research-summary',
        component: () => import('pages/casemanager/caseDetails/ResearchSummary.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/proposed-endeavor',
        component: () => import('pages/casemanager/caseDetails/ProposedEndeavorPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/Experience&Education',
        component: () => import('pages/casemanager/caseDetails/ExperienceAndEducation.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/extraordinary-abilities',
        component: () => import('pages/casemanager/caseDetails/ExtraOrdinaryPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/recommendation-letters',
        component: () => import('pages/casemanager/caseDetails/RecommendersPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/personal-statement',
        component: () => import('pages/casemanager/caseDetails/PersonalStatementPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/case/:id/messages',
        component: () => import('pages/casemanager/MessagesView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'guide',
        name: 'casemanager-guide',
        component: () => import('pages/casemanager/CaseManagerGuidePage.vue'),
        meta: {
          title: 'Case Manager Guide',
          requiresAuth: true,
        },
      },
      {
        path: '/casemanager/messagecategories',
        name: 'casemanager-messagecategories',
        component: () => import('pages/casemanager/MessageCategoriesPage.vue'),
        meta: {
          title: 'Message Categories',
          requiresAuth: true,
        },
      },
    ],
  },

  // {
  //   path: '/case/:id/documents',
  //   component: () => import('pages/casemanager/caseDetails/DocumentsPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/messages',
  //   component: () => import('pages/casemanager/caseDetails/MessagesPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/proposed-endeavor',
  //   component: () => import('pages/casemanager/caseDetails/ProposedEndeavorPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/publications',
  //   component: () => import('pages/casemanager/caseDetails/PublicationsPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/questionnaire',
  //   component: () => import('pages/casemanager/caseDetails/QuestionnairePage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/contributions',
  //   component: () => import('pages/casemanager/caseDetails/ContributionsPage.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/case/:id/i485',
  //   component: () => import('pages/casemanager/caseDetails/I485Page.vue'),
  //   meta: { requiresAuth: true },
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: '404 Not Found',
    },
  },
]

export default routes
