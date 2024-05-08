<template>
  <div>
    <HistoryGrid :history-items="historyItems" />
  </div>
</template>

<script lang="ts" setup>
const { data: playHistory, refresh } = await useLazyFetch(`/api/me/history`);

const historyItems = computed(() => {
  return playHistory.value?.items ?? [];
});

useIntervalFn(refresh, 30_000);
</script>
