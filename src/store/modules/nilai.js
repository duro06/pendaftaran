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
  getMapels({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/mapel")
        .then(resp => {
          console.log("mapel", resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const getters = {
  mapel(state) {
    return state.mapel;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
