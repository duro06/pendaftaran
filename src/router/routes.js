
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'pendaftaran', component: () => import('pages/Pendaftaran.vue') },
    ]
  },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/daftar', component: () => import('pages/Register.vue') },
      { path: '/diskusi', component: () => import('pages/Chat.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
