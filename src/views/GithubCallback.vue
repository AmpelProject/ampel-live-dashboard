<template>
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
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

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
      if (this.$route.query.code == undefined) {
        this.error = this.$route.query;
        return;
      }
      const url = this.$store.state.BACKEND_AUTH_URL + "/auth/authorize";
      const data = {
        state: this.$route.query.state,
        code: this.$route.query.code,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.$store.state.token = response.data;
          this.$store.state.token_payload = jwt_decode(
            response.data.access_token
          );
          this.$router.replace("/");
        })
        .catch((error) => {
          this.error = {
            error: error.name,
            error_description: url + " " + error.message,
          };
        });
    },
  },
};
</script>
