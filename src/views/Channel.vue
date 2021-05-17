<template>
  <b-container>
    <vue-json-pretty :data="channel"> </vue-json-pretty>
  </b-container>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  name: "Channel",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      channel: {},
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$store.state.api_client
        .get("/live/channel/" + this.$route.params.id)
        .then((response: AxiosResponse) => {
          this.channel = response.data;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
};
</script>
