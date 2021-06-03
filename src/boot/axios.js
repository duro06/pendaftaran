import Vue from "vue";
import axios from "axios";

import { LocalStorage } from "quasar";

Vue.prototype.$axios = axios;

export function server() {
  const server = "http://pendaftaran-server.test:9000";
  //   const server = "http://192.168.0.9:5000";
  return server;
}
export function pathImage() {
  const pathImage = `http://pendaftaran-server.test:9000/storage/`;
  //   const pathImage = `http://192.168.0.9:5000/storage/`;
  return pathImage;
}

export function http() {
  return axios.create({
    baseURL: server() + "/api",
    headers: {
      Authorization: "Bearer " + getAccessToken()
    }
  });
}
export function httpFile() {
  return axios.create({
    baseURL: server() + "/api",
    headers: {
      Authorization: "Bearer " + getAccessToken(),
      "Content-Type": "multipart/form-data"
    }
  });
}

function getAccessToken() {
  const token = LocalStorage.getAll().token;
  return token;
}

export function setToken(data) {
  LocalStorage.set("token", data);
}

export function delToken() {
  LocalStorage.clear();
}
