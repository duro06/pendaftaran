import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  pendaftarans: [],
  pesertas: [],
  registered: false
});
const mutations = {
  setPendaftarans(state, payload) {
    (state.pendaftarans = []), (state.pendaftarans = payload);
  },
  setPesertas(state, payload) {
    (state.pesertas = []), (state.pesertas = payload);
  },
  setRegistered(state, payload) {
    state.registered = payload;
  }
};
const actions = {
  // pendaftaran by siswa
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
          let peserta = resp.data;
          let user = context.rootGetters["users/user"];
          context.commit("setPesertas", resp.data);
          peserta.filter(data => {
            if (data.user_id == user.id || user.role == "Admin") {
              context.commit("setRegistered", true);
            }
          });
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
        .post("daftar/daftar_peserta", payload)
        .then(resp => {
          console.log(resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // pendaftaran by admin
  addPendaftaran(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("admin/add_pendaftaran", payload)
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
  },
  registered(state) {
    return state.registered;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
