<template>
  <div class="about">
    <div v-if="!token">Authorizing with GitHub ...</div>
    <div v-else>
      <b-container>
        <b-row>
          <b-col>User: {{ user }}</b-col>
          <b-col>
            <countdown :end-time="expire" :speed="10000">
              <template v-slot:process="anyYouWantedScopName">
                <span
                  >Token expires in:
                  {{ humanize(anyYouWantedScopName.remainingTime) }}</span
                >
              </template>
              <template v-slot:finish>
                Token expired!
                <b-button variant="danger" @click="login"
                  >Refresh token</b-button
                >
              </template>
            </countdown>
          </b-col>
        </b-row>
        <b-input-group prepend="API token" class="mt-3">
          <b-form-input
            id="access_token"
            v-model="token.access_token"
            :readonly="true"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button
              variant="info"
              title="Copy to clipboard"
              v-clipboard="() => token.access_token"
              ><b-icon-clipboard></b-icon-clipboard
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-container>
    </div>
  </div>
</template>

<script>
import humanizeDuration from "humanize-duration";
import axios from "axios";

export default {
  name: "Profile",
  computed: {
    token() {
      return this.$store.state.token;
    },
    user() {
      return this.$store.state.token_payload.name;
    },
    expire() {
      return new Date(this.$store.state.token_payload.exp * 1000);
    },
  },
  created() {
    if (!this.$store.state.token) {
      this.login();
    }
  },
  methods: {
    humanize(duration) {
      return humanizeDuration(duration, { round: true });
    },
    login() {
      axios
        .get(this.$store.state.BACKEND_AUTH_URL + "/auth/login")
        .then((response) => {
          window.location = response.data.url;
        });
    },
  },
};
</script>
