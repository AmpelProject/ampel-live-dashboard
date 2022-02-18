<template>
  <div
    v-b-tooltip.hover
    title="These are your persistent tokens for the ZTF archive service. They do not expire until explicitly deleted."
  >
    <b-list-group>
      <b-list-group-item
        v-for="token in tokens"
        :key="token.token_id"
        class="d-flex align-items-center justify-content-between"
      >
        <span class="abbrev"
          >{{ token.token }}
          <b-badge class="ml-1" variant="secondary">{{ token.role }}</b-badge>
          <b-badge class="ml-1" variant="secondary">{{
            token.partnership ? "partnership" : "public"
          }}</b-badge></span
        >
        <b-button-group>
          <b-button
            variant="danger"
            title="Delete token"
            @click="deleteToken(token.token_id)"
            ><b-icon-x
          /></b-button>
          <b-button
            variant="info"
            title="Copy to clipboard"
            v-clipboard="() => token.token"
            ><b-icon-clipboard></b-icon-clipboard
          ></b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group>
    <div class="mt-2 float-right">
      <b-button variant="success" @click="addToken()">New token</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

export default Vue.extend({
  name: "ArchiveTokens",
  data() {
    // FIXME: handle token refresh
    const client = axios.create({
      baseURL: process.env.VUE_APP_BACKEND_ARCHIVE_URL,
      headers: { Authorization: `bearer ${this.$store.state.token}` },
    });
    axiosRetry(client, {
      retryDelay: axiosRetry.exponentialDelay,
      // retry any method that returns 5xx, not just idempotent ones
      retryCondition: axiosRetry.isRetryableError,
    });
    return {
      client: client,
      tokens: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.client
        .get("/tokens/")
        .then((response: AxiosResponse) => {
          this.tokens = response.data;
        })
        .catch((error) => {
          console.log("oh woe");
          console.log(error);
        });
    },
    addToken() {
      this.client
        .post("/tokens/")
        .then(() => {
          this.load();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteToken(id: Number) {
      this.client
        .delete("/tokens/" + id)
        .then(() => {
          this.load();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
.abbrev {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
