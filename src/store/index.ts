import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import jwt_decode from "jwt-decode";
import qs from "qs";
import { TokenPayload } from "@/types";

import {
  validateRelativism,
  parseRelativism,
  buildDate,
} from "@/lib/relativism";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    BACKEND_AUTH_URL: "https://ampel.zeuthen.desy.de/api",
    BACKEND_URL: "https://ampel.zeuthen.desy.de/api",
    token: undefined,
    token_payload: undefined,
    api_client: undefined as AxiosInstance | undefined,
    timeRange: { after: "now-1d", before: "now" },
    timeRangeQuery: {
      after: buildDate(parseRelativism("now-1d")).toISOString(),
      before: buildDate(parseRelativism("now")).toISOString(),
    },
  },
  mutations: {
    login(state, access_token) {
      localStorage.setItem("token", access_token);
      state.token = access_token;
      state.token_payload = jwt_decode(access_token);
      state.api_client = axios.create({
        baseURL: state.BACKEND_URL,
        headers: { Authorization: `bearer ${state.token}` },
        paramsSerializer: function (params: Object) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      axiosRetry(state.api_client, { retryDelay: axiosRetry.exponentialDelay });
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = undefined;
      state.token_payload = undefined;
      state.api_client = undefined;
    },
    setTimeRange(state, payload) {
      state.timeRange = payload;
      state.timeRangeQuery = {
        after: buildDate(parseRelativism(payload.after)).toISOString(),
        before: buildDate(parseRelativism(payload.before)).toISOString(),
      };
    },
  },
  actions: {},
  modules: {},
});

const getToken = function (store: any) {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const content: TokenPayload = jwt_decode(token);
      if (!(content.exp < Date.now() / 1000)) {
        store.commit("login", token);
      } else {
        console.log("Removing expired token");
        store.commit("logout");
      }
    } catch (error) {
      console.log(error);
      store.commit("logout");
    }
  }
};

getToken(store);

export default store;
