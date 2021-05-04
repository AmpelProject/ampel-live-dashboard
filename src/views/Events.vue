<template>
  <b-container>
    <h1>Events</h1>

    <div id="events-table">
      <table>
        <!-- ...thead... -->
        <tbody>
          <tr v-for="event in events.slice().reverse()" :key="event.run">
            <td>{{ event.run }}</td>
            <td>{{ event.tier }}</td>
            <td>{{ event.process }}</td>
            <td>{{ event.timestamp }}</td>
            <td>{{ event.duration }}</td>
            <td>{{ event.success }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Events",
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(this.$store.state.BACKEND_URL + "/live/events?after=3600", {
          headers: { Authorization: "bearer ${this.$store.state.token}" },
        })
        .then((response) => {
          this.events = response.data.events;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}
</style>
