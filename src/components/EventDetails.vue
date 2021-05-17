<template>
  <div>
    <b-table :items="events" :fields="fields">
      <template #cell(timestamp)="data">
        <router-link :to="`/event/${data.item.run}`">{{
          formatDate(data.item.timestamp)
        }}</router-link>
      </template>
      <!-- A virtual column -->
      <template #cell(successmark)="data">
        <div v-if="data.item.success">
          <b-icon icon="check-circle-fill" variant="success"></b-icon>
        </div>
        <div v-else-if="data.item.success == undefined">
          <b-icon icon="question-circle-fill" variant="warning"></b-icon>
        </div>
        <div v-else>
          <b-icon icon="x-square-fill" variant="danger"></b-icon>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import { formatDate, toHHMMSS } from "@/lib/utils";

export default Vue.extend({
  name: "EventDetails",
  props: {
    name: String,
    timeRangeQuery: Object,
  },
  data: () => {
    return {
      events: [],
      fields: [
        {
          key: "timestamp",
          label: "Start",
        },
        {
          key: "duration",
          formatter: toHHMMSS,
        },
        { key: "successmark", label: "Status" },
      ],
      loading: true,
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    timeRangeQuery() {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$store.state.api_client
        .get("/live/events/" + this.name, {
          params: this.timeRangeQuery,
        })
        .then((response: AxiosResponse) => {
          this.events = response.data.events.slice().reverse();
          this.loading = false;
        })
        .catch((error: Error) => {
          this.loading = false;
          console.log(error);
        });
    },
    formatDate,
  },
});
</script>

<style scoped></style>
