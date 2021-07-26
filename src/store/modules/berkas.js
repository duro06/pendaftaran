import * as Axios from "boot/axios";
const state = () => ({
  berkases: [],
  berkas: {}
});
const mutations = {
  setBerkases(state, payload) {
    state.berkases = payload;
  },
  setBerkas(state, payload) {
    state.berkas = payload;
  }
};
const actions = {
  getBerkas(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("admin/berkas")
        .then(resp => {
          console.log("berakas", resp);
          context.commit("setBerkases", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBerkasById(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("admin/berkas/by_id", payload)
        .then(resp => {
          console.log(resp);
          let berkas = resp.data;
          let KK = berkas.user.bio.path;
          let data = {
            name: "Kartu Keluarga",
            path: KK
          };
          berkas.media.push(data);
          context.commit("setBerkas", berkas);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const getters = {
  berkases(state) {
    return state.berkases;
  },
  berkas(state) {
    return state.berkas;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
