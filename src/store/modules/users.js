import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";

const state = () => ({
  user: {},
  form: {},
  token:
    LocalStorage.getItem("token") === null
      ? null
      : LocalStorage.getItem("token"),
  server: Axios.server(),
  image: Axios.pathImage(),
  skeleton: false
});
const mutations = {
  removeUser(state) {
    (state.user = {}), (state.token = null);
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setFrom(state, payload) {
    state.form = payload;
  },
  setSkeleton(state, payload) {
    state.skeleton = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  }
};
const actions = {
  skeletonFalse({ commit }) {
    commit("setSkeleton", false);
  },
  skeletonTrue({ commit }) {
    commit("setSkeleton", true);
  },
  saveFirebaseToken(context, payload) {
    Axios.http()
      .post("prokc/sw-token", payload)
      .then(res => {
      })
      .catch(err => {
      });
  },
  login(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("/auth/login", payload)
        .then(res => {
          Notify.create({
            message: "Login success",
            color: "positive"
          });
          LocalStorage.set("token", res.data.token);
          context.commit("setToken", res.data.token);
          resolve(res);
        })
        .catch(err => {
          Notify.create({
            message: "Login Gagal",
            // color: "negative"
            position: "center"
          });
          if (err.response.status == 422) {
            if (err.response.data.errors.email) {
              Notify.create({
                message: err.response.data.errors.email,
                color: "negative",
                position: "top"
              });
            }
            if (err.response.data.errors.password) {
              Notify.create({
                message: err.response.data.errors.password,
                color: "negative",
                position: "top"
              });
            }
          }
          reject(err);
        });
    });
  },
  register(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("/auth/register", payload)
        .then(res => {
          if (res.data.success == true) {
            Notify.create({
              message: "Register success",
              color: "positive"
            });
          }
          if (res.data.success == false) {
            Notify.create({
              message: "Register Gagal",
              color: "negative"
            });
          }
          //   LocalStorage.set("token", res.data.token);
          //   context.commit("setToken", res.data.token);
          resolve(res);
        })
        .catch(err => {
          Notify.create({
            message: "Registrasi Gagal",
            color: "negative",
            position: "top"
          });
          if (err.response.status == 422) {
            if (err.response.data.errors.email) {
              Notify.create({
                message: err.response.data.errors.email,
                color: "negative",
                position: "top"
              });
            }
            if (err.response.data.errors.name) {
              Notify.create({
                message: err.response.data.errors.name,
                color: "negative",
                position: "top"
              });
            }
            if (err.response.data.errors.password) {
              Notify.create({
                message: err.response.data.errors.password,
                color: "negative",
                position: "top"
              });
            }
          }
          reject(err);
        });
    });
  },

  googleLogin(context, payload) {
    LocalStorage.set("token", payload);
    context.commit("setToken", payload);
  },
  getUser(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/user")
        .then(res => {
          context.commit("setUser", res.data.data);
          if (!LocalStorage.getItem("role")) {
            LocalStorage.set("role", res.data.data.role);
          }
          // context.commit("setUser", res.data.data);
          // location.reload();
          resolve(res.data.data);
        })
        .catch(err => {
          Notify.create({
            message: "failed to get user data",
            color: "negative",
            position: "top"
          });

          reject(err);
        });
    });
  },
  logout(context) {
    return new Promise(resolve => {
      Axios.http()
        .get("/auth/logout")
        .then(res => {
          context.commit("removeUser");
          Axios.delToken();
          Notify.create({
            message: "Logged Out",
            icon: "eva-info-alert"
          });
          resolve(res);
        });
    });
  },
  removeUser(context) {
    return new Promise(() => {
      Axios.http()
        .get("auth/logout")
        .then(res => {
          Axios.delToken();
          context.commit("removeUser");
        })
        .catch(err => {
        });
    });
  },
  updateProfile(context, payload) {
    let data = {
      provinsi:
        payload.provinsi != null
          ? payload.provinsi.label
            ? payload.provinsi.label
            : payload.provinsi
          : null,
      email: payload.email,
      name: payload.name,
      notelp: payload.notelp,
      //   nowhatsapp: payload.nowhatsapp,
      alamat: payload.alamat,
      kota:
        payload.kota != null
          ? payload.kota.label
            ? payload.kota.label
            : payload.kota
          : null
    };
    return new Promise((reso, rej) => {
      Axios.http()
        .put(`/me/update/${payload.id}`, data)
        .then(resp => {
          context.dispatch("getUser");
          reso(resp);
        })
        .catch(err => {
          rej(err);
        });
    });
  },
  uploadImage(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.httpFile()
        .post(`/me/upload_image/${payload.id}`, payload.data)
        .then(res => {
          context.dispatch("getUser");
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const getters = {
  user(state) {
    return state.user;
  },
  loggedIn(state) {
    return state.token !== null;
  },
  role(state) {
    return state.user.role;
  },
  skeleton(state) {
    return state.skeleton;
  },
  storage(state) {
    return state.image;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
