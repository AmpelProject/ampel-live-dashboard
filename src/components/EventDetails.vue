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
import axios from "axios";

function toHHMMSS(sec_num: number | undefined): string | undefined {
  if (sec_num == undefined) {
    return undefined;
  }
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

export default Vue.extend({
  name: "EventDetails",
  props: {
    name: String,
    before: Object,
    after: Object,
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
  methods: {
    loadData() {
      this.loading = true;
      axios
        .get(this.$store.state.BACKEND_URL + "/live/events/" + this.name, {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: { after: this.after.format(), before: this.before.format() },
        })
        .then((response) => {
          this.events = response.data.events.slice().reverse();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    formatDate(value: string): string {
      return Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(new Date(value));
    },
  },
});
</script>

<style scoped></style>
