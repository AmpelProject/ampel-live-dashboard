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
import Vue from "vue";
import EventQuery from "@/mixins/EventQuery";

export default Vue.extend({
  name: "Troubles",
  mixins: [EventQuery],
  data() {
    return {
      troubles: [],
    };
  },
  created() {
    this.fetch("/live/troubles", (response) => {
      this.troubles = response.data.troubles;
    });
  },
});
</script>
