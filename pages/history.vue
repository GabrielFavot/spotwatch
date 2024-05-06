<template>
  <div>
    <HistoryGrid :history-items="historyItems" />
  </div>
</template>

<script lang="ts" setup>
const { data: playHistory } = await useLazyFetch(`/api/me/history`);

const historyItems = computed(() => {
  return playHistory.value?.items ?? [];
});
</script>
