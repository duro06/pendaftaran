import { messaging } from "boot/firebase";
import * as Axios from "boot/axios";

import { Loading } from "quasar";

import { formatDistanceToNowStrict, isAfter, parseISO, format } from "date-fns";
import { enGB, id } from "date-fns/locale";

const state = () => ({
  cloudMessage: "",
  cloudMessages: [],
  token: "",
  allToken: [],
  chat: [],
  chattings: [],
  meta: {},

  users: [],

  progressDone: false,

  themporary: {}
});
const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setChat(state, payload) {
    (state.chat = []), (state.chat = payload);
  },
  setMeta(state, payload) {
    (state.meta = {}), (state.meta = payload);
  },
  clearChat(state) {
    (state.chat = []), (state.chattings = []);
  },

  setUnshift(state, payload) {
    state.chattings.unshift(payload);
  },

  setChattings(state, payload) {
    state.chattings.push(...payload);
  },
  setNewChattings(state, payload) {
    (state.chattings = []), state.chattings.push(...payload);
  },

  setUsers(state, payload) {
    (state.users = []), (state.users = payload);
  },

  setProgress(state, payload) {
    state.progressDone = payload;
  }
};
const actions = {
  getUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("forum/get_user", payload)
        .then(resp => {
          commit("setUsers", resp.data.user);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getMessageToken({ commit }) {
    return new Promise(resolve => {
      messaging
        .getToken()
        .then(token => {
          if (token) {
            commit("setToken", token);
            resolve(token);
          } else {
          }
        })
        .catch(err => {});
    });
  },
  createChat(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .post("forum/add_message", payload)
        .then(res => {
          // context.commit("setChat", res.data.chat);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getAllChat(context, payload) {
    // Loading.show()
    context.commit("setProgress", false);
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("forum/get_chat", payload)
        .then(res => {
          context.commit("setChat", res.data.chat.data);
          context.commit("setChattings", res.data.chat.data);
          context.commit("setMeta", res.data.chat);
          context.commit("setProgress", true);
          context.commit("setUsers", res.data.user_array);
          Loading.hide();
          resolve(res.data.chat.data);
        })
        .catch(err => {
          context.commit("setProgress", true);
          // Loading.hide()
          reject(err);
        });
    });
  },

  unshiftChat(context, payload) {
    context.commit("setUnshift", payload);
  },

  updateChattings(context, payload) {
    return new Promise((resolve, reject) => {
      Axios.http()
        .get("forum/get_chat", payload)
        .then(res => {
          // context.commit("setChat", res.data.chat.data);
          context.commit("setNewChattings", res.data.chat.data);
          context.commit("setMeta", res.data.chat);
          context.commit("setProgress", true);
          context.commit("setUsers", res.data.user_array);
          // Loading.hide()
          resolve(res.data.chat.data);
        })
        .catch(err => {
          reject(err);
          // context.commit("setProgress", true);
          // Loading.hide()
        });
    });
  },
  clearChat({ commit }) {
    commit("clearChat");
  }
};
const getters = {
  swToken(state) {
    return state.token;
  },
  chats(state) {
    return state.chat;
  },
  progressDone(state) {
    return state.progressDone;
  },
  meta(state) {
    return state.meta;
  },
  themporary(state) {
    return state.themporary;
  },
  chattings(state) {
    return state.chattings;
  },

  array_tanggal(state) {
    return [
      ...new Map(
        state.chattings.map(item => [
          format(new Date(item.created_at), "PPPP"),
          format(new Date(item.created_at), "PPPP", { locale: id })
        ])
      ).values()
    ].reverse();
  },

  users(state) {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
