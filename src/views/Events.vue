<template>
  <b-container fluid>
    <b-row v-for="summary in processes" v-bind:key="summary.process">
      <b-col><process-group :summary="summary" :before="before" :after="after" /></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { EventSummary } from "../types";

// import humanizeDuration from "humanize-duration";
import ProcessGroup from "@/components/ProcessGroup.vue";
import moment from "moment-relativism";
import axios from "axios";

export default Vue.extend({
  name: "Events",
  components: {
    ProcessGroup,
  },
  data() {
    return {
      before: moment.relativism("now"),
      after: moment.relativism("now-1d"),
      isLoading: true,
      filter: null,
      filterOn: [],
      fields: [
        { key: "tier" },
        { key: "process", tdClass: "text-left" },
        { key: "count", label: "count" },
      ],
      processes: [] as Array<EventSummary>,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;
      axios
        .get(this.$store.state.BACKEND_URL + "/live/event_summary", {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: { after: this.after.format(), before: this.before.format() },
        })
        .then((response) => {
          this.processes = response.data.processes;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
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
