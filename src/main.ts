import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-clipboard";
import "./plugins/vue-countdown";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // redirect if not authenticated, storing the requested path for later
  if (
    !store.state.token &&
    !to.matched.some((record) => record.meta.authRoute)
  ) {
    sessionStorage.setItem("redirectAfterLogin", to.path);
    next({ name: "Profile" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
