<template>
  <b-card
    @click="expand = !expand"
    :title="summary.process"
    :sub-title="`${summary.count}`"
  >
    <b-card v-if="expand"> <event-details :name="summary.process" :before="before" :after="after" /> </b-card>
  </b-card>
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
    before: Object,
    after: Object,
  },
  data: () => {
    return {
      expand: false,
    };
  },
});
</script>

<style scoped></style>
