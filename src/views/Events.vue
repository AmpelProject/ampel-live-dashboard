<template>
  <b-container fluid>
    <b-row v-for="summary in processes" v-bind:key="summary.process">
      <b-col
        ><process-group :summary="summary" :before="before" :after="after"
      /></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { EventSummary } from "../types";

// import humanizeDuration from "humanize-duration";
import ProcessGroup from "@/components/ProcessGroup.vue";
import { AxiosResponse } from "axios";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Events",
  components: {
    ProcessGroup,
  },
  data() {
    return {
      processes: [] as Array<EventSummary>,
    };
  },
  computed: mapState(["timeRange"]),
  watch: {
    timeRange() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.state.api_client
        .get("/live/event_summary", {
          params: {
            after: this.$store.state.afterISOString,
            before: this.$store.state.beforeISOString,
          },
        })
        .then((response: AxiosResponse) => {
          this.processes = response.data.processes;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}
</style>
