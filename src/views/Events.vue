<template>
  <b-container>
    <div id="events-table">
      <b-table :busy="isLoading" :items="events" :fields="fields">
        <!-- A virtual column -->
        <template #cell(successmark)="data">
          <div v-if="data.item.success">
            <b-icon icon="check-circle-fill" variant="success"></b-icon>
          </div>
          <div v-else-if="data.item.success == undefined">
            <b-icon icon="circle-fill" variant="warning"></b-icon>
          </div>
          <div v-else>
            <b-icon icon="x-square-fill" variant="danger"></b-icon>
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import humanizeDuration from "humanize-duration";
import moment from "moment";
import axios from "axios";

export default {
  name: "Events",
  data() {
    return {
      isLoading: true,
      fields: [
        { key: "run" },
        { key: "process" },
        { key: "tier" },
        {
          key: "timestamp",
          sortable: true,
          sortDirection: "desc",
          formatter: (value) => {
            return moment(value).fromNow();
          },
        },
        {
          key: "duration",
          formatter: (value) => {
            return humanizeDuration(value * 1000, { round: true });
          },
        },
        { key: "successmark", label: "Status" },
      ],
      events: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;
      axios
        .get(this.$store.state.BACKEND_URL + "/live/events?after=3600", {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
        })
        .then((response) => {
          this.events = response.data.events.slice().reverse();
          this.loading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("YYYYMMDD");
      }
    },
  },
};
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
