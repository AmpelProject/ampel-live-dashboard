<template>
  <b-container>
    <h3>Run {{ $route.params.id }}</h3>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-logs variant="light"
            >Logs</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-logs"
          accordion="event-accordion"
          role="tabpanel"
        >
          <b-card-body> <process-logs :run_id="$route.params.id" /></b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </b-container>
</template>

<script lang="ts">
import ProcessLogs from "@/components/ProcessLogs.vue";

export default {
  name: "Event",
  components: {
    ProcessLogs,
  },
};
</script>
