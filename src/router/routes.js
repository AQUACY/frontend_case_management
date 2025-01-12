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
