<template>
  <b-container>
    <vue-json-pretty :data="item"> </vue-json-pretty>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default Vue.extend({
  name: "JsonItem",
  components: {
    VueJsonPretty,
  },
  props: {
    path: String,
  },
  data() {
    return {
      item: {},
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$store.state.api_client
        .get(this.path)
        .then((response: AxiosResponse) => {
          this.item = response.data;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
});
</script>
