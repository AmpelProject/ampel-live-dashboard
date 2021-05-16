<template>
  <div>
    <b-dropdown no-caret right>
      <template #button-content>
        <b-icon-clock-history></b-icon-clock-history>
      </template>
      <b-dropdown-item
        v-for="option in options"
        :key="option.text"
        @click="$store.commit('setTimeRange', option.value)"
        >{{ option.text }}
        <b-icon-check
          v-if="
            $store.state.timeRange.after == option.value.after &&
            $store.state.timeRange.before == option.value.before
          "
      /></b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DatePicker",
  data: () => {
    return {
      options: [
        { value: { after: "now-1h", before: "now" }, text: "Last hour" },
        { value: { after: "now-6h", before: "now" }, text: "Last 6 hours" },
        { value: { after: "now-1d", before: "now" }, text: "Last 24 hours" },
        { value: { after: "now-2d", before: "now" }, text: "Last 2 days" },
        { value: { after: "now-7d", before: "now" }, text: "Last 7 days" },
      ],
    };
  },
  computed: {
    currentTimeRange() {
      // NB: have to destructure object to avoid comparing getters/setters,
      // which are not equal even if the underlying values are equal
      const range = this.$store.state.timeRange;
      const value = this.options.find(
        (option) =>
          option.value.after == range.after &&
          option.value.before == range.before
      );
      if (value == undefined) {
        return `${range.before} to ${range.after}`;
      } else {
        return value.text;
      }
    },
  },
});
</script>

<style scoped></style>
