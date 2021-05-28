<template>
  <b-container @click="expand = !expand" class="mt-1">
    <b-card-group deck>
      <b-card no-body>
        <b-card-header header-tag="h6">
          <b-icon :icon="expand ? 'chevron-down' : 'chevron-right'"></b-icon>
          <b-badge variant="light">T{{ summary.tier }}</b-badge>
          {{ summary.process.replaceAll("|", " ") }}
          <b-badge
            pill
            variant="danger"
            v-if="summary.failures"
            :to="'/events/' + summary.process + '/troubles'"
            >{{ summary.failures }}</b-badge
          >
          <b-badge pill variant="light">{{ summary.count }}</b-badge>
        </b-card-header>
        <b-card-body v-if="expand">
          <event-details
            :name="summary.process"
            :timeRangeQuery="timeRangeQuery"
          />
        </b-card-body>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { EventSummary } from "../types";
import EventDetails from "@/components/EventDetails.vue";

export default Vue.extend({
  name: "ProcessGroup",
  components: {
    EventDetails,
  },
  props: {
    summary: Object as PropType<EventSummary>,
    timeRangeQuery: Object,
  },
  data: () => {
    return {
      expand: false,
    };
  },
});
</script>

<style scoped></style>
