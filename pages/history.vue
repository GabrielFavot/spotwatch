<template>
  <div>
    <HistoryGrid :history-items="playHistory ?? []" />
  </div>
</template>

<script lang="ts" setup>
const { data: playHistory, refresh } = await useLazyFetch(`/api/me/history`);

useIntervalFn(refresh, 30_000);
</script>
