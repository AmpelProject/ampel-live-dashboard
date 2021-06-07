<template>
  <b-card-group
    deck
    v-b-tooltip.hover
    title="These are the identities associated with your API token. You have access to any Ampel channel that your username, one of your organizations, or one of your teams as a member."
  >
    <b-card header="User">{{ this.$store.state.token_payload.name }}</b-card>
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
</template>

<script>
export default {
  name: "TokenIdentities",
};
</script>
