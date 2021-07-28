import * as Axios from "boot/axios";
const state = () => ({
  sekolah: {}
});
const mutations = {
  setSekolah(state, payload) {
    state.sekolah = payload;
  }
};
const actions = {
  getSekolah(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("admin/sekolah/get-sekolah")
        .then(resp => {
          context.commit("setSekolah", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  tambahData(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/sekolah/store`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  uploadImage(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.httpFile()
        .post(`/sekolah/upload_image/${payload.id}`, payload.data)
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
  sekolah(state) {
    return state.sekolah;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
