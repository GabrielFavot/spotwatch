<template>
  <PlayingTrack
    v-if="playedItem"
    :playback-state="playbackState"
  />
</template>

<script lang="ts" setup>
import type { PlaybackState, Track } from '@spotify/web-api-ts-sdk';

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/playback-state`,
);

const playedItem = computed<null | Track>(() => {
  const item = playbackState.value?.item;

  if (!item) return navigateTo('/offline');

  if ('album' in item) {
    return item;
  }

  return null;
});
</script>
