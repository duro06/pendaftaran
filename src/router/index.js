import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

import { Notify, LocalStorage } from "quasar";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  // The route navigation guard
  Router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem("token");
    const role = LocalStorage.getItem("role");
    if (to.matched.some(record => record.meta.visitor)) {
      if (loggedIn) {
        next({
          path: "/"
        });
      } else {
        next();
      }
    } else {
      next();
    }
    if (to.matched.some(record => record.meta.admin)) {
      if (!role == "Admin") {
        next({
          path: "/profile"
        });
      } else {
        next();
      }
    } else {
      next();
    }
    if (to.matched.some(record => record.meta.user)) {
      if (!loggedIn) {
        next({
          path: "/profile"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  Router.onError(error => {
    Notify.create({
      caption:
        "Halaman tidak dapat dimuat, periksa kembali jaringan anda, kemudian refresh halaman",
      message: "Terjadi kesalahan",
      color: "red",
      position: "top-right"
    });
  });
  return Router;
}
