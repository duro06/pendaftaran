import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  mapels: []
});
const mutations = {
  setMapel(state, payload) {
    state.mapels = payload;
  }
};
const actions = {
  getMapels(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/mapel")
        .then(resp => {
          let user = context.rootGetters["users/user"];
          let nilai = user.nilai;
          let media = user.media;
          let mapel = resp.data;
          mapel.forEach(data => {
            nilai.filter(sama => {
              if (data.id == sama.mapel_id) {
                data.nilai_id = sama.id;
                data.nilai = sama.nilai;
              }
            });
            media.filter(sama => {
              if (data.id == sama.mapel_id) {
                data.media_id = sama.id;
                data.media = sama.path;
              }
            });
          });
          console.log("user", user);
          context.commit("setMapel", mapel);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  isiMapel(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`mapel/nilai`, payload)
        .then(resp => {
          console.log("nilai", resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  uploadImage(context, payload) {
    console.log("payload", payload);
    return new Promise((resolve, reject) => {
      Axios.httpFile()
        .post(`/mapel/upload_image/${payload.id}`, payload.data)
        .then(res => {
          console.log(res);
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
  mapels(state) {
    return state.mapels;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
