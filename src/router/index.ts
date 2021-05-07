import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Events.vue"),
  },
  {
    path: "/events/:process/troubles",
    name: "Troubles",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Troubles.vue"),
  },
  {
    path: "/event/:id",
    name: "Event",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Event.vue"),
  },
  {
    path: "/auth/github",
    name: "GithubCallback",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GithubCallback.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
