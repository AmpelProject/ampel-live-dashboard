import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import qs from "qs";

import {
  validateRelativism,
  parseRelativism,
  buildDate,
} from "@/lib/relativism";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BACKEND_AUTH_URL: "https://ampel.zeuthen.desy.de/api",
    BACKEND_URL: "https://ampel.zeuthen.desy.de/api",
    token: undefined,
    token_payload: undefined,
    api_client: undefined as AxiosInstance | undefined,
    timeRange: { after: "now-1d", before: "now" },
    afterISOString: buildDate(parseRelativism("now-1d")).toISOString(),
    beforeISOString: buildDate(parseRelativism("now")).toISOString(),
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token.access_token;
      state.token_payload = jwt_decode(payload.token.access_token);
      state.api_client = axios.create({
        baseURL: state.BACKEND_URL,
        headers: { Authorization: `bearer ${state.token}` },
        paramsSerializer: function (params: Object) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
    },
    setTimeRange(state, payload) {
      state.timeRange = payload;
      state.afterISOString = buildDate(
        parseRelativism(payload.after)
      ).toISOString();
      state.beforeISOString = buildDate(
        parseRelativism(payload.before)
      ).toISOString();
    },
  },
  actions: {},
  modules: {},
});
