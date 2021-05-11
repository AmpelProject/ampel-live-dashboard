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
import { parseRelativism, buildDate } from "@/lib/relativism";
import axios from "axios";

export default Vue.extend({
  name: "Events",
  components: {
    ProcessGroup,
  },
  data() {
    return {
      before: "now",
      after: "now-1d",
      processes: [] as Array<EventSummary>,
    };
  },
  computed: {
    afterDate(): string {
      return buildDate(parseRelativism(this.after)).toISOString();
    },
    beforeDate(): string {
      return buildDate(parseRelativism(this.before)).toISOString();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(this.$store.state.BACKEND_URL + "/live/event_summary", {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: {
            after: this.afterDate,
            before: this.beforeDate,
          },
        })
        .then((response) => {
          this.processes = response.data.processes;
        })
        .catch((error) => {
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
