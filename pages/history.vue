<template>
  <div>
    <HistoryGrid :history-items="historyItems" />
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';

const { data: playHistory } = await useLazyFetch(`/api/me/history`);

const historyItems = computed(() => {
  return playHistory.value?.items ?? [];
});

useIntervalFn(async () => {
  const { data } = await useLazyFetch(`/api/me/history`);
  playHistory.value = data.value;
}, 30000);
</script>
