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
        path: '/client/recommenders',
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
