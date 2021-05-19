<template>
  <div>
    <b-list-group>
      <b-list-group-item
        class="flex-column align-items-start"
        v-for="doc in events"
        :key="doc.timestamp"
        :to="{ name: 'Event', params: { id: String(doc.run) } }"
      >
        <div class="d-flex w-100 justify-content-between">
          <span>
            <router-link
              :to="{ name: 'Process', params: { id: doc.process } }"
              >{{ doc.process }}</router-link
            >
          </span>
          <span>T{{ doc.tier }}</span>
          <span>{{ toHHMMSS(doc.duration) }}</span>
          <span>
            <b-icon
              icon="check-circle-fill"
              variant="success"
              v-if="doc.success"
            />
            <b-icon
              icon="question-circle-fill"
              variant="warning"
              v-else-if="doc.success == undefined"
            />
            <b-icon icon="x-square-fill" variant="danger" v-else />
          </span>
          <span>{{ formatDate(doc.timestamp) }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue, { VueConstructor } from "vue";
import EventQuery from "@/mixins/EventQuery";
import { formatDate, toHHMMSS } from "@/lib/utils";
import { TroubleDoc } from "@/types";

// Teach TypeScript about mixins
// see: https://forum.vuejs.org/t/using-mixins-with-typescript/24256/18
export default (Vue as VueConstructor<
  Vue & InstanceType<typeof EventQuery>
>).extend({
  name: "Runs",
  mixins: [EventQuery],
  data() {
    return {
      events: [] as Array<TroubleDoc>,
    };
  },
  watch: {
    timeRangeQuery() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.fetch("/live/events", (response: AxiosResponse) => {
        response.data.events.reverse();
        this.events = response.data.events;
      });
    },
    formatDate: formatDate,
    toHHMMSS: toHHMMSS,
  },
});
</script>
