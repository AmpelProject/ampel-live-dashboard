<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>Run {{ $route.params.id }}</h3>
      </b-col>
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
              v-model="filter"
              debounce="200"
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
      <b-col>
        <b-form-group
          label="Items"
          label-for="per-page-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="per-page-input"
              v-model="perPage"
              :options="perPageOptions"
            ></b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-pagination
          id="page-input"
          align="right"
          v-model="currentPage"
          :totalRows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        id="events-table"
        borderless
        small
        :items="loadData"
        :filter="filter"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
      </b-table>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { BvTableCtxObject } from "bootstrap-vue";
import axios from "axios";

export default {
  name: "Event",
  data() {
    return {
      fields: [
        "timestamp",
        "location",
        "level",
        { key: "message", tdClass: "text-left" },
      ],
      filter: undefined,
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      perPageOptions: [10, 20, 50, 100, 1000],
    };
  },
  created() {
    this.countRows();
  },
  watch: {
    filter: function () {
      this.countRows();
    },
  },
  methods: {
    loadData(ctx: BvTableCtxObject, callback: Function): void {
      axios
        .get(
          this.$store.state.BACKEND_URL + "/live/logs/" + this.$route.params.id,
          {
            headers: { Authorization: "bearer ${this.$store.state.token}" },
            params: {
              skip: (ctx.currentPage - 1) * ctx.perPage,
              limit: ctx.perPage,
              filter: ctx.filter,
            },
          }
        )
        .then((response) => {
          callback(response.data.logs);
        })
        .catch((error) => {
          console.log(error);
          callback([]);
        });
    },
    countRows(): void {
      axios
        .get(
          this.$store.state.BACKEND_URL +
            "/live/logs/" +
            this.$route.params.id +
            "/length",
          {
            headers: { Authorization: "bearer ${this.$store.state.token}" },
            params: { filter: this.filter },
          }
        )
        .then((response) => {
          this.totalRows = response.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
