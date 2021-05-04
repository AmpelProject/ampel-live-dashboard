import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BACKEND_URL: "http://localhost:8000/api",
    token: undefined
  },
  mutations: {},
  actions: {},
  modules: {},
});
