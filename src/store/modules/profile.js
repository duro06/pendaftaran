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
  updateCV(context, payload) {
    let data = {
      ttl: payload.ttl
    };
    console.log("data ", data);
    return new Promise((reso, rej) => {
      Axios.http()
        .put(`/bio/update/${payload.id}`, data)
        .then(resp => {
          console.log(resp);
          context.dispatch("getBio");
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
        .post(`/bio/upload_image/${payload.id}`, payload.data)
        .then(res => {
          console.log(res);
          context.dispatch("getBio");
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getBio(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/bio")
        .then(res => {
          //   console.log("res ", res);
          console.log("Bio ", res.data.data);
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
