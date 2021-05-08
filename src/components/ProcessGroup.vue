<template>
  <div @click="expand = !expand">
    <b-card-header>
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
    <b-card no-body>
      <b-card-body v-if="expand">
        <event-details
          :name="summary.process"
          :before="before"
          :after="after"
        />
      </b-card-body>
    </b-card>
  </div>
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
    before: Date,
    after: Date,
  },
  data: () => {
    return {
      expand: false,
    };
  },
});
</script>

<style scoped></style>
