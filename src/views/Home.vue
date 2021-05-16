<template>
  <div class="home">
    <div v-if="!$store.state.token">
      <b-container>
        <b-card class="my-5 text-center">
          <div class="mb-2">No potatoes for you.</div>
          <div>
            <b-button class="mb-2" to="/profile" variant="primary"
              ><b-icon-github></b-icon-github> Log in with GitHub</b-button
            >
          </div>
        </b-card>
      </b-container>
    </div>
    <div v-else>Potatoes for you!</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Troubles from "@/views/Troubles.vue";

export default Vue.extend({
  name: "Home",
  // components: {
  //   // Troubles,
  //   // DatePicker,
  // },
});
</script>
