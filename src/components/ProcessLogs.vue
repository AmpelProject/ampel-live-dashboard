<template>
  <b-container>
    <b-form-row>
      <b-col>
        <b-pagination
          id="page-input"
          align="left"
          v-model="currentPage"
          :totalRows="totalRows"
          :per-page="perPage"
        ></b-pagination>
        <b-button
          v-b-toggle.filter-panel
          variant="primary"
          size="sm"
          class="filter-toggle"
        >
          <b-icon-filter></b-icon-filter>
        </b-button>
        <b-sidebar id="filter-panel" title="Filter logs">
          <b-container>
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Message"
                  label-for="filter-input"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-input
                      id="filter-input"
                      v-model="filter.message"
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
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Level"
                  label-for="level-input"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-select
                      id="level-input"
                      v-model="filter.logLevel"
                      :options="logFlagOptions"
                    ></b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Per page"
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
            </b-form-row>
          </b-container>
        </b-sidebar>
      </b-col>
    </b-form-row>
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
import qs from "qs";

export default {
  name: "ProcessLogs",
  props: {
    run_id: String,
  },
  data() {
    return {
      fields: [
        { key: "timestamp", label: "Time", formatter: this.formatDate },
        { key: "location", label: "Where" },
        "level",
        { key: "message", tdClass: "text-left" },
      ],
      filter: {
        message: undefined,
        logLevel: 2,
      },
      filterPanel: false,
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      perPageOptions: [10, 20, 50, 100, 1000],
      logFlags: ["DEBUG", "VERBOSE", "INFO", "SHOUT", "WARNING", "ERROR"],
      logFlagOptions: [
        { value: 0, text: "DEBUG" },
        { value: 1, text: "VERBOSE" },
        { value: 2, text: "INFO" },
        { value: 3, text: "SHOUT" },
        { value: 4, text: "WARNING" },
        { value: 5, text: "ERROR" },
      ],
    };
  },
  created() {
    this.countRows();
  },
  watch: {
    "filter.message": function () {
      this.countRows();
    },
    "filter.logLevel": function () {
      this.countRows();
    },
  },
  methods: {
    getLogFlags(): undefined | Array<string> {
      if (this.filter.logLevel == undefined) {
        return undefined;
      }
      let flags = [];
      for (var i in this.logFlagOptions) {
        if (this.logFlagOptions[i].value >= this.filter.logLevel) {
          flags.push(this.logFlagOptions[i].text);
        }
      }
      return flags;
    },
    loadData(ctx: BvTableCtxObject, callback: Function): void {
      console.log(this.getLogFlags());
      console.log(this.run_id);
      axios
        .get(
          this.$store.state.BACKEND_URL +
            "/live/events/" +
            this.run_id +
            "/logs",
          {
            headers: { Authorization: "bearer ${this.$store.state.token}" },
            params: {
              skip: (ctx.currentPage - 1) * ctx.perPage,
              limit: ctx.perPage,
              filter: ctx.filter.message,
              flags: this.getLogFlags(),
            },
            paramsSerializer: function (params) {
              return qs.stringify(params, { arrayFormat: "repeat" });
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
            "/live/events/" +
            this.run_id +
            "/logs/count",

          {
            headers: { Authorization: "bearer ${this.$store.state.token}" },
            params: { filter: this.filter.message, flags: this.getLogFlags() },
            paramsSerializer: function (params) {
              return qs.stringify(params, { arrayFormat: "repeat" });
            },
          }
        )
        .then((response) => {
          this.totalRows = response.data.length;
        })
        .catch((error) => {
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
};
</script>

<style scoped>
button.filter-toggle {
  float: right;
}
ul.b-pagination {
  float: left;
}
</style>
