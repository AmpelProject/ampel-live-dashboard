<template>
  <b-container fluid>
    <b-row class="my-2">
      <b-col>
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model.lazy="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- <b-col lg="3" class="my-1">
        <b-form-group
          label="After"
          label-for="after-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input
            id="after-select"
            v-model.lazy="after"
            size="sm"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="3" class="my-1">
        <b-form-group
          label="Before"
          label-for="before-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input
            id="before-select"
            v-model.lazy="before"
            size="sm"
          ></b-form-input>
        </b-form-group>
      </b-col> -->
    </b-row>
    <b-row>
      <b-col>
    <div id="events-table">
      <b-table
        :busy="isLoading"
        :items="events"
        :fields="fields"
        :filter="filter"
      >
        <template #cell(run)="data">
          <router-link :to="`/event/${data.item.run}`">{{
            data.item.run
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
    </b-col>
    </b-row>
  </b-container>
</template>

<script>
import humanizeDuration from "humanize-duration";
import moment from "moment-relativism";
import axios from "axios";

export default {
  name: "Events",
  data() {
    return {
      before: moment.relativism("now"),
      after: moment.relativism("now-1d"),
      isLoading: true,
      filter: null,
      filterOn: [],
      fields: [
        { key: "run" },
        { key: "process", tdClass: "text-left" },
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
        .get(this.$store.state.BACKEND_URL + "/live/events", {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: { after: this.after.format(), before: this.before.format() },
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
