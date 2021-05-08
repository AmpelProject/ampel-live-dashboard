import Vue from "vue";
import axios from "axios";
import qs from "qs";
import relativism from "@/lib/relativism";

export default Vue.extend({
  props: {
    process: String,
    before: {
      default: () => {
        return relativism("now");
      },
      type: Date,
    },
    after: {
      default: () => {
        return relativism("now-1d");
      },
      type: Date,
    },
  },
  methods: {
    fetch: function (path: string, callback: Function): void {
      axios
        .get(this.$store.state.BACKEND_URL + path, {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: {
            after: this.after.toISOString(),
            before: this.before.toISOString(),
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
