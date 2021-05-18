<template>
  <div>
    <b-list-group>
      <b-list-group-item
        class="flex-column align-items-start"
        v-for="doc in troubles"
        :key="doc._id"
        :to="{ name: 'Trouble', params: { id: doc._id } }"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ doc._exc_content.error }}</h5>
          <small>{{ formatDate(doc.timestamp) }}</small>
        </div>

        <p class="mb-1">{{ doc._exc_content.message }}</p>

        <small>{{ doc.process }}</small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue, { VueConstructor } from "vue";
import EventQuery from "@/mixins/EventQuery";
import { formatDate } from "@/lib/utils";
import { TroubleDoc } from "@/types";

// Teach TypeScript about mixins
// see: https://forum.vuejs.org/t/using-mixins-with-typescript/24256/18
export default (Vue as VueConstructor<
  Vue & InstanceType<typeof EventQuery>
>).extend({
  name: "Troubles",
  mixins: [EventQuery],
  data() {
    return {
      troubles: [] as Array<TroubleDoc>,
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
      this.fetch("/live/troubles", (response: AxiosResponse) => {
        this.troubles = response.data.troubles;
        for (var doc of this.troubles) {
          doc._exc_content = this.getExceptionLine(doc.exception);
        }
      });
    },
    getExceptionLine(lines: Array<string>): { error: string; message: string } {
      for (var line of lines.slice().reverse()) {
        const match = line.match(/^(.*Error):\s+(.*)/);
        if (match) {
          return { error: match[1], message: match[2] };
        }
      }
      return { error: "Exception", message: "" };
    },
    formatDate: formatDate,
  },
});
</script>
