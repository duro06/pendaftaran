
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Main" */'layouts/MainLayout.vue'),
    children: [
      { path: '',name:'index', component: () => import(/* webpackChunkName: "Index" */'pages/Index.vue') },
      { path: '/pendaftaran',name:'pendaftaran', component: () => import(/* webpackChunkName: "Pendaftaran" */'pages/Pendaftaran.vue') },
      { path: '/diskusi',name:'diskusi', component: () => import(/* webpackChunkName: "Chat" */'pages/Chat.vue') },
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/Account.vue'),
    children: [
      { path: '/login',name:'login', component: () => import(/* webpackChunkName: "Login" */'pages/Login.vue') },
      { path: '/daftar',name:'daftar', component: () => import(/* webpackChunkName: "Register" */'pages/Register.vue') },
    ]
  },
  {
    path: '/portal',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '/berita',name:'berita', component: () => import(/* webpackChunkName: "Berita" */'pages/NewsPage.vue') },
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
