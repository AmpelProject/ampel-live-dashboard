<template>
  <b-container>
    <h3>Run {{ $route.params.id }}</h3>
    <process-logs :run_id="$route.params.id" />
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
