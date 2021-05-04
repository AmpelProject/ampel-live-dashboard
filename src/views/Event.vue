<template>
  <b-container>
    <h1>Run {{ $route.params.id }}</h1>

    <div id="events-table">
      <b-table :busy="isLoading" :items="logs" :fields="fields"> </b-table>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Event",
  data() {
    return {
      isLoading: false,
      logs: [],
      fields: [
        "timestamp",
        "tier",
        "location",
        "level",
        { key: "message", tdClass: "text-left" },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;
      axios
        .get(
          this.$store.state.BACKEND_URL + "/live/logs/" + this.$route.params.id,
          {
            headers: { Authorization: "bearer ${this.$store.state.token}" },
          }
        )
        .then((response) => {
          this.logs = response.data.logs;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>
