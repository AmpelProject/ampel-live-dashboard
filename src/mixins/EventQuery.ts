import Vue from "vue";
import axios from "axios";
import qs from "qs";
import relativism from "@/lib/relativism";

export default Vue.extend({
  props: {
    process: String,
    before: {
      default: "now",
      type: String,
      required: true,
    },
    after: {
      default: "now-1d",
      type: String,
      required: true,
    },
  },
  computed: {
    afterDate() {
      return relativism(this.after).toISOString();
    },
    beforeDate() {
      return relativism(this.after).toISOString();
    },
  },
  methods: {
    fetch: function (path: string, callback: Function): void {
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
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
