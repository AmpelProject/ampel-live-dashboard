import Vue from "vue";
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
    before: {
      default: "now",
      type: String,
      required: true,
      validator: validateRelativism,
    },
    after: {
      default: "now-1d",
      type: String,
      required: true,
      validator: validateRelativism,
    },
  },
  // Use computed properties to parse and transform date, as TS seems to insist
  // that Date-typed props are actually Date | string
  computed: {
    afterDate() {
      return buildDate(parseRelativism(this.after)).toISOString();
    },
    beforeDate() {
      return buildDate(parseRelativism(this.before)).toISOString();
    },
  },
  methods: {
    fetch: function (
      path: string,
      callback: (response: AxiosResponse) => void
    ): void {
      axios
        .get(this.$store.state.BACKEND_URL + path, {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: {
            after: this.afterDate,
            before: this.beforeDate,
            process: this.process,
          },
          paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        })
        .then(callback)
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
