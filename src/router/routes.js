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
          import(
            /* webpackChunkName: "Index Pendaftaran" */ "pages/pendaftaran/IndexPendaftaran.vue"
          )
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
            /* webpackChunkName: "edit-nilai" */ "src/pages/profile/nilai/IsiNilai.vue"
          )
      }
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "admin",
        component: () =>
          import(/* webpackChunkName: "index" */ "pages/admin/Index.vue")
      },
      {
        path: "/admin/nilai",
        name: "nilai",
        meta: { title: "Tipe Nilai", backto: "admin" },
        component: () =>
          import(
            /* webpackChunkName: "edit tipe nilai" */ "pages/admin/type/Nilai.vue"
          )
      },
      {
        path: "/admin/mapel",
        name: "mapel",
        meta: { title: "Mata Pelajaran", backto: "admin" },
        component: () =>
          import(/* webpackChunkName: "edit mapel" */ "pages/admin/Mapel.vue")
      },
      {
        path: "/admin/berkas",
        name: "berkas",
        meta: { title: "Berkas", backto: "admin" },
        component: () =>
          import(
            /* webpackChunkName: "Admin berkas" */ "pages/admin/berkas/IndexBerkas.vue"
          )
      },
      {
        path: "/admin/berkas/details/:slug",
        name: "details.berkas",
        meta: { title: "Details", backto: "berkas" },
        component: () =>
          import(
            /* webpackChunkName: "Details Berkas" */ "pages/admin/berkas/DetailBerkas.vue"
          )
      },
      {
        path: "/admin/pendaftaran",
        name: "admin-pendaftaran",
        meta: { title: "Admin Pendaftaran", backto: "admin" },
        component: () =>
          import(
            /* webpackChunkName: "Admin Pendaftaran" */ "pages/admin/pendaftaran/Index.vue"
          )
      }
    ],
    meta: {
      admin: true
    }
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
  {
    path: "/test",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/test",
        name: "test",
        component: () => import(/* webpackChunkName: "test" */ "pages/Test.vue")
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
