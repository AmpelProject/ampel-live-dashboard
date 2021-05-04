<template>
  <div class="about">
    <div v-if="!token">Generating token ...</div>
    <div v-else>
      {{ token.access_token }}
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
  created() {
    this.authorize();
  },
  methods: {
    authorize() {
      const data = {
        state: this.$route.query.state,
        code: this.$route.query.code,
      };

      axios
        .post(this.$store.state.BACKEND_URL + "/auth/authorize", data)
        .then((response) => {
          this.$store.state.token = response.data;
          this.$store.state.token_payload = jwt_decode(
            response.data.access_token
          );
          this.$router.replace("/profile");
        })
        .catch(() => {
          this.$router.replace("/");
        });
    },
  },
};
</script>
