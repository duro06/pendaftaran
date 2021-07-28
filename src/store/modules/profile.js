import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  bio: {}
});
const mutations = {
  setBio(state, payload) {
    state.bio = payload;
  }
};
const actions = {
  createBio(context, payload) {
    let data = {
      user_id: payload
    };
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("bio/store", data)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateCV(context, payload) {
    let data = {
      ttl: payload.ttl,
      nik: payload.nik,
      asal_sekolah: payload.asal_sekolah,
      kota: payload.kota
    };
    return new Promise((reso, rej) => {
      Axios.http()
        .put(`/bio/update/${payload.id}`, data)
        .then(resp => {
          context.dispatch("getBio");
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
        .post(`/bio/upload_image/${payload.id}`, payload.data)
        .then(res => {
          context.dispatch("getBio");
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBio(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/bio")
        .then(res => {
          context.commit("setBio", res.data.data);
          //   context.commit("setUser", res.data.data);
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
  }
};
const getters = {
  bio(state) {
    return state.bio;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
