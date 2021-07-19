import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  mapels: [],
  types: [],
  nilais: []
});
const mutations = {
  setMapel(state, payload) {
    state.mapels = payload;
  },
  setTypes(state, payload) {
    state.types = payload;
  },
  setNilais(state, payload) {
    state.nilais = payload;
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
          // mapel.forEach(data => {
          //   nilai.filter(sama => {
          //     if (data.id == sama.mapel_id) {
          //       data.nilai_id = sama.id;
          //       data.nilai = sama.nilai;
          //     }
          //   });
          //   media.filter(sama => {
          //     if (data.id == sama.mapel_id) {
          //       data.media_id = sama.id;
          //       data.media = sama.path;
          //     }
          //   });
          // });
          console.log("user", user);
          context.commit("setMapel", mapel);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getType(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get(`type`, payload)
        .then(resp => {
          console.log("nilai", resp.data);
          context.commit("setTypes", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getNilaiBy(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get(`nilai/nilai_by`, payload)
        .then(resp => {
          console.log("nilai", resp.data);
          context.commit("setNilais", resp.data);
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
        .post(`nilai`, payload)
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
        .post(`/type/upload_image/${payload.id}`, payload.data)
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
  },
  types(state) {
    return state.types;
  },
  nilais(state) {
    return state.nilais;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
