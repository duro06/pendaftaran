const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Main" */ "layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "Index" */ "pages/Index.vue")
      },
      {
        path: "/pendaftaran",
        name: "pendaftaran",
        meta: { title: "Pendaftaran", backto: "index" },
        component: () =>
          import(/* webpackChunkName: "Pendaftaran" */ "pages/Pendaftaran.vue")
      },
      {
        path: "/diskusi",
        name: "diskusi",
        meta: { title: "Forum", backto: "index", user: true },
        component: () => import(/* webpackChunkName: "Chat" */ "pages/Chat.vue")
      }
    ]
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "index-profile" */ "pages/profile/IndexProfile.vue"
          )
      },
      {
        path: "/profile/edit_profile",
        name: "edit_profile",
        meta: { title: "Edit Profile", backto: "profile" },
        component: () =>
          import(
            /* webpackChunkName: "edit-profile" */ "pages/profile/EditProfile.vue"
          )
      },
      {
        path: "/profile/edit_cv",
        name: "edit_cv",
        meta: { title: "Edit Curriculum Vitae", backto: "profile" },
        component: () =>
          import(
            /* webpackChunkName: "edit-curriculum-vitae" */ "pages/profile/EditCV.vue"
          )
      },
      {
        path: "/profile/edit_nilai",
        name: "edit_nilai",
        meta: { title: "Edit Nilai", backto: "profile" },
        component: () =>
          import(
            /* webpackChunkName: "edit-nilai" */ "pages/profile/IsiNilai.vue"
          )
      }
    ]
  },
  {
    path: "/account",
    component: () => import("layouts/Account.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "Login" */ "pages/auth/Login.vue")
      },
      {
        path: "/daftar",
        name: "daftar",
        component: () =>
          import(/* webpackChunkName: "Register" */ "pages/auth/Register.vue")
      }
    ],
    meta: {
      visitor: true
    }
  },
  {
    path: "/portal",
    component: () => import("layouts/LandingLayout.vue"),
    children: [
      {
        path: "/berita",
        name: "berita",
        component: () =>
          import(/* webpackChunkName: "Berita" */ "pages/NewsPage.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
