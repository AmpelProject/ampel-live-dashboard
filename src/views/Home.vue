<template>
  <div class="home">
    <b-container class="mt-3">
      <b-card-group deck>
        <b-card header="Processes">
          <b-list-group>
            <b-list-group-item
              v-for="summary in processes"
              :key="summary.process"
              :to="{ name: 'Process', params: { id: summary.process } }"
              v-b-tooltip.hover
              title="Click to view process configuration"
              >{{ summary.process }}
              <span class="float-right">
                <b-badge variant="default" class="mr-1"
                  >T{{ summary.tier }}
                </b-badge>
                <b-badge
                  variant="secondary"
                  class="mr-1"
                  :to="{
                    name: 'Runs',
                    params: { process: summary.process },
                  }"
                  v-b-tooltip.hover
                  :title="`${summary.count} runs; click to view.`"
                  >{{ summary.count }}
                </b-badge>
                <b-badge
                  class="mr-1"
                  variant="danger"
                  v-if="summary.failures"
                  :to="{
                    name: 'Troubles',
                    params: { process: summary.process },
                  }"
                  v-b-tooltip.hover
                  :title="`${summary.failures} errors; click to view.`"
                  >{{ summary.failures }}</b-badge
                ></span
              >
            </b-list-group-item></b-list-group
          >
        </b-card>
        <b-card header="Channels"
          ><b-list-group>
            <b-list-group-item
              v-for="channel in channels"
              :key="channel.channel"
              :to="{ name: 'Channel', params: { id: channel.channel } }"
              v-b-tooltip.hover
              title="Click to view channel configuration"
              >{{ channel.channel }}
            </b-list-group-item></b-list-group
          >
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { AxiosResponse } from "axios";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      channels: [],
      processes: [],
    };
  },
  computed: mapState(["timeRangeQuery"]),
  created() {
    this.getChannels();
    this.getProcesses();
  },
  watch: {
    timeRangeQuery() {
      this.getProcesses();
    },
  },
  methods: {
    getChannels() {
      this.$store.state.api_client
        .get("/live/channels")
        .then((response: AxiosResponse) => {
          this.channels = response.data;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
    getProcesses() {
      this.$store.state.api_client
        .get("/live/event_summary", {
          params: this.$store.state.timeRangeQuery,
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
