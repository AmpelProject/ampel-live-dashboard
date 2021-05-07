<template>
  <b-container>
    <b-row v-for="doc in troubles" :key="doc.timestamp">
      <div>
        <b-card-header>
          <router-link :to="'/event/' + doc.run">{{ doc.process }}</router-link>
        </b-card-header>
        <b-card class="text-monospace">
          <small v-for="line in doc.exception" :key="line">
            {{ line }}
            <br />
          </small>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue, { VueConstructor } from "vue";
import EventQuery from "@/mixins/EventQuery";

// Teach TypeScript about mixins
// see: https://forum.vuejs.org/t/using-mixins-with-typescript/24256/18
export default (Vue as VueConstructor<
  Vue & InstanceType<typeof EventQuery>
>).extend({
  name: "Troubles",
  mixins: [EventQuery],
  data() {
    return {
      troubles: [],
    };
  },
  created() {
    this.fetch("/live/troubles", (response: AxiosResponse) => {
      this.troubles = response.data.troubles;
    });
  },
});
</script>
