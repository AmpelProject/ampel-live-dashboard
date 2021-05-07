
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import moment from "moment-relativism";

export default Vue.extend({
  props: {
    process: String,
    before: {
      default: () => { return moment.relativism("now");},
      type: Object
    },
    after: {
      default: () => { return moment.relativism("now-1d");},
      type: Object
    },
  },
  methods: {
    fetch: function(path: string, callback: Function): void {
      axios
        .get(this.$store.state.BACKEND_URL + path, {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
          params: { after: this.after.format(), before: this.before.format(), process: this.process },
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
