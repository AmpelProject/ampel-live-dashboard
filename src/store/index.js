import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BACKEND_URL: "http://localhost:8000/api",
    token: undefined,
    token_payload: undefined,
  },
  mutations: {},
  actions: {},
  modules: {},
});
