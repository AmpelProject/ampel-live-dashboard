<template>
  <div id="app">
    <div id="nav" class="mb-1" v-if="$store.state.token">
      <b-navbar type="light" variant="light">
        <b-navbar-brand to="/">
          <img
            src="https://placekitten.com/g/30/30"
            class="d-inline-block align-top"
            alt="Kitten"
          />
          Ampel
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item to="/events">Events</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <date-picker />
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DatePicker from "@/components/DatePicker.vue";

export default Vue.extend({
  name: "App",
  components: {
    DatePicker,
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
});
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app .about .home {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
