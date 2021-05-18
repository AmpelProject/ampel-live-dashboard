import Vue from "vue";
import { mapState } from "vuex";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import {
  validateRelativism,
  parseRelativism,
  buildDate,
} from "@/lib/relativism";

export default Vue.extend({
  props: {
    process: String,
  },
  computed: mapState(["timeRangeQuery"]),
  methods: {
    fetch: function (
      path: string,
      callback: (response: AxiosResponse) => void
    ): void {
      this.$store.state.api_client
        .get(path, {
          params: {
            process: this.process,
            ...this.$store.state.timeRangeQuery,
          },
        })
        .then(callback)
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
});
