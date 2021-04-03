
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/reset-password',
        component: () => import('pages/auth/ResetPassword.vue')
      },
      {
        path: '/home',
        component: () => import('pages/Home.vue')
      },
      {
        path: '/teams',
        component: () => import('pages/Teams.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
