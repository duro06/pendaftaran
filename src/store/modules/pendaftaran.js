import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  pendaftarans: [],
  pesertas: []
});
const mutations = {
  setPendaftarans(state, payload) {
    (state.pendaftarans = []), (state.pendaftarans = payload);
  },
  setPesertas(state, payload) {
    (state.pesertas = []), (state.pesertas = payload);
  }
};
const actions = {
  getPendaftarans(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("daftar")
        .then(resp => {
          console.log(resp);
          context.commit("setPendaftarans", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getPesertas(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("daftar/peserta")
        .then(resp => {
          console.log(resp);
          context.commit("setPesertas", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  daftarPeserta(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("daftar/daftar-peserta", payload)
        .then(resp => {
          console.log(resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const getters = {
  pendaftarans(state) {
    return state.pendaftarans;
  },
  pesertas(state) {
    return state.pesertas;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
