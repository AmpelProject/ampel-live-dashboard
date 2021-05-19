<template>
  <b-container class="mb-2">
    <div>
      <div v-if="!$store.state.token">
        <div v-if="!loginRequested">
          <b-container class="text-center">
            <b-card no-body class="my-5 text-center" style="max-width: 540px">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    :src="require('../assets/logo.png')"
                    width="220"
                    height="220"
                    alt="Image"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body title="Ampel Live Dashboard">
                    <b-card-text>
                      Please authenticate to continue. Your GitHub username and
                      organization memberships will be used to grant access to
                      individual Ampel channels.
                    </b-card-text>
                    <b-button class="mb-2" @click="login()" variant="primary"
                      ><b-icon-github></b-icon-github> Log in with
                      GitHub</b-button
                    >
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </div>
        <div v-else>Authorizing with GitHub ...</div>
      </div>
      <div v-else>
        <b-container>
          <b-row class="mb-2">
            <b-col>
              <b-form>
                <b-form-group id="api-token-group" label-for="access_token">
                  <template #label>
                    API token
                    <countdown :end-time="expire" :speed="10000" tag="span">
                      <template v-slot:process="anyYouWantedScopName">
                        (valid for
                        {{ humanize(anyYouWantedScopName.remainingTime) }})
                      </template>
                      <template v-slot:finish> (expired!) </template>
                    </countdown>
                  </template>

                  <b-input-group class="mt-3">
                    <b-form-input
                      id="access_token"
                      v-model="token"
                      :readonly="true"
                      v-b-tooltip.hover
                      title="This is your access token. Use it to make direct queries to the Ampel API."
                    >
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        variant="success"
                        title="Refresh token"
                        @click="login"
                        ><b-icon-arrow-repeat></b-icon-arrow-repeat
                      ></b-button>
                      <b-button
                        variant="danger"
                        title="Delete token and log out"
                        @click="logout"
                        ><b-icon-x
                      /></b-button>
                      <b-button
                        variant="info"
                        title="Copy to clipboard"
                        v-clipboard="() => token"
                        ><b-icon-clipboard></b-icon-clipboard
                      ></b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>

          <b-row
            class="mt-1"
            v-b-tooltip.hover
            title="These are your identities. You have access to any Ampel channel that your username, one of your organizations, or one of your teams as a member."
          >
            <b-col>
              <b-card-group deck>
                <b-card header="User">{{ user }}</b-card>
                <b-card header="Organizations">
                  <b-list-group>
                    <b-list-group-item
                      v-for="org in $store.state.token_payload.orgs"
                      :key="org"
                    >
                      {{ org }}
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
                <b-card text-left header="Teams">
                  <b-list-group>
                    <b-list-group-item
                      v-for="team in $store.state.token_payload.teams"
                      :key="team"
                    >
                      {{ team }}
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </b-container>
</template>

<script>
import { toHHMMSS } from "@/lib/utils";
import axios from "axios";
import axiosRetry from "axios-retry";

export default {
  name: "Profile",
  data() {
    return {
      loginRequested: false,
    };
  },
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
  methods: {
    humanize(duration) {
      return toHHMMSS(duration / 1000);
    },
    logout() {
      this.loginRequested = false;
      this.$store.commit("logout");
    },
    login() {
      this.loginRequested = true;
      const client = axios.create({
        baseURL: this.$store.state.BACKEND_AUTH_URL,
      });
      axiosRetry(client, { retryDelay: axiosRetry.exponentialDelay });
      client.get("/auth/login").then((response) => {
        // Use state to validate redirect from auth provider
        sessionStorage.setItem("redirectState", response.data.params.state);
        window.location = response.data.url;
      });
    },
  },
};
</script>
