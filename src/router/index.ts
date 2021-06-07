import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tokens",
    name: "Profile",
    meta: {
      authRoute: true,
    },
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
    path: "/events/:process",
    name: "Runs",
    props: (route: Route) => ({ process: route.params.process }),
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Runs.vue"),
  },
  {
    path: "/events/:process/troubles",
    name: "Troubles",
    props: (route: Route) => ({ process: route.params.process }),
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Troubles.vue"),
  },
  {
    path: "/troubles",
    name: "AllTroubles",
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
    path: "/channel/:id",
    name: "Channel",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/JsonItem.vue"),
    props: (route: Route) => ({ path: "/live/channel/" + route.params.id }),
  },
  {
    path: "/process/:id",
    name: "Process",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/JsonItem.vue"),
    props: (route: Route) => ({ path: "/live/process/" + route.params.id }),
  },
  {
    path: "/trouble/:id",
    name: "Trouble",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/JsonItem.vue"),
    props: (route: Route) => ({ path: "/live/troubles/" + route.params.id }),
  },
  {
    path: "/auth/github",
    name: "GithubCallback",
    meta: {
      authRoute: true,
    },
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
