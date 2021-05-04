<template>
  <div class="about">
    <div v-if="!token">Authorizing with GitHub ...</div>
    <div v-else>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  created() {
    if (!this.$store.state.token) {
      this.login();
    }
  },
  methods: {
    login() {
      axios
        .get(this.$store.state.BACKEND_URL + "/auth/login")
        .then((response) => {
          window.location = response.data.url;
        });
    },
  },
};
</script>
