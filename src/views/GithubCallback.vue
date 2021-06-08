<template>
  <b-container class="mb-2 text-center">
    <div class="about">
      <div v-if="!error">Generating token ...</div>
      <div v-else-if="error.error">
        <b-card title="Authorization error" :sub-title="error.error">
          <b-card-text>
            {{ error.error_description }}
          </b-card-text>

          <a v-if="error.error_uri" :href="error.error_uri" class="card-link"
            >More info</a
          >
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import axiosRetry from "axios-retry";

export default {
  name: "GithubCallback",
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  data() {
    return {
      error: undefined,
    };
  },
  created() {
    this.authorize();
  },
  methods: {
    authorize() {
      // GitHub refused to issue an auth code
      if (this.$route.query.code == undefined) {
        this.error = this.$route.query;
        return;
        // Got unexpected state (possible CSRF attack)
      } else if (
        this.$route.query.state != sessionStorage.getItem("redirectState")
      ) {
        this.error = {
          error: "Forged OAuth2 request",
          error_description: `Expected state ${sessionStorage.getItem(
            "redirectState"
          )}, got ${this.$route.query.state}`,
          error_uri: "https://auth0.com/docs/protocols/state-parameters",
        };
        return;
      } else {
        sessionStorage.removeItem("redirectState");
      }

      const path = "/auth/authorize";
      const client = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_AUTH_URL,
      });
      axiosRetry(client, {
        retryDelay: axiosRetry.exponentialDelay,
        // retry any method that returns 5xx, not just idempotent ones
        retryCondition: axiosRetry.isRetryableError,
      });

      client
        .post(path, {
          state: this.$route.query.state,
          code: this.$route.query.code,
        })
        .then((response) => {
          this.$store.commit("login", response.data.access_token);
          const target =
            sessionStorage.getItem("redirectAfterLogin") || "/tokens";
          sessionStorage.removeItem("redirectAfterLogin");
          this.$router.replace(target);
        })
        .catch((error) => {
          this.error = {
            error: error.name,
            error_description: client.baseURL + path + " " + error.message,
          };
        });
    },
  },
};
</script>
