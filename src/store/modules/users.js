import { LocalStorage } from "quasar";
import * as Axios from "boot/axios";
import { Notify } from "quasar";

const state = () => ({
  user: {},
  form: {},
  token:
    LocalStorage.getItem("token") === null
      ? null
      : LocalStorage.getItem("token"),
  server: Axios.server(),
  image: Axios.pathImage()
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
  setToken(state, payload) {
    state.token = payload;
  }
};
const actions = {
  saveFirebaseToken(context, payload) {
    Axios.http()
      .post("prokc/sw-token", payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
          console.log("login res", res);
          LocalStorage.set("token", res.data.token);
          context.commit("setToken", res.data.token);
          resolve(res);
        })
        .catch(err => {
          Notify.create({
            message: "Login Gagal, Email atau password Anda salah",
            color: "negative",
            position: "top"
          });
          console.log("error ", err);
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
          console.log("login res", res.data);
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
          console.log("error ", err);
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
          //   console.log("res ", res);
          console.log("user ", res.data.data);
          context.commit("setUser", res.data.data);
          context.commit("setUser", res.data.data);
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
          console.log("logout ", res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  updateProfile(context, payload) {
    let data = {
      provinsi: payload.provinsi.label
        ? payload.provinsi.label
        : payload.provinsi,
      email: payload.email,
      name: payload.name,
      notelp: payload.notelp,
      nowhatsapp: payload.nowhatsapp,
      alamat: payload.alamat,
      kota: payload.kota.label ? payload.kota.label : payload.kota
    };
    console.log("data ", data);
    return new Promise((reso, rej) => {
      Axios.http()
        .put(`/me/update/${payload.id}`, data)
        .then(resp => {
          console.log(resp);
          context.dispatch("getUser");
          reso(resp);
        })
        .catch(err => {
          rej(err);
        });
    });
  },
  uploadImage(context, payload) {
    console.log("id ", payload.id, "data ", payload.data);
    return new Promise((resolve, reject) => {
      Axios.httpFile()
        .post(`/me/upload_image/${payload.id}`, payload.data)
        .then(res => {
          console.log(res);
          context.dispatch("getUser");
          resolve(res);
        })
        .catch(err => {
          console.log(err);
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
