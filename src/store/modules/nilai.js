import { LocalStorage, Notify } from "quasar";
import * as Axios from "boot/axios";
const state = () => ({
  mapels: [],
  types: [],
  nilais: [],
  medias: []
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
  },
  setMedias(state, payload) {
    state.medias = payload;
  }
};
const actions = {
  // mapel, type dan nilai by siswa
  getMapels(context) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("/mapel")
        .then(resp => {
          // let user = context.rootGetters["users/user"];
          let mapel = resp.data;
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
          context.commit("setNilais", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getMediaBy(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get(`nilai/media_by`, payload)
        .then(resp => {
          context.commit("setMedias", resp.data);
          resolve(resp.data);
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
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateMapel(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`nilai/update/${payload.id}`, payload)
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
      // Axios.httpFile()
      //   .post(`/type/upload_image/${payload.id}`, payload.data)
      Axios.http()
        .post(`type/upload_image`, payload)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // mapel,type dan nilai by admin
  adminAddMapel(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/mapel/add`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  adminEditMapel(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/mapel/edit`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  adminDeleteMapel(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/mapel/delete`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  adminAddType(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/type/add`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  adminEditType(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/type/edit`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  adminDeleteType(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post(`admin/type/delete`, payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
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
  },
  medias(state) {
    return state.medias;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
