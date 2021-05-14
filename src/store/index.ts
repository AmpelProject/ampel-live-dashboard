import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BACKEND_AUTH_URL: "https://ampel.zeuthen.desy.de/api",
    BACKEND_URL: "https://ampel.zeuthen.desy.de/api",
    token: undefined,
    token_payload: undefined,
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      state.token_payload = jwt_decode(payload.token.access_token);
    },
  },
  actions: {},
  modules: {},
});
