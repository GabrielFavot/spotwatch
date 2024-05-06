<template>
  <PlayingTrack
    v-if="playbackState"
    :playback-state="playbackState"
  />
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';

const playbackState = await useLazyFetch<PlaybackState>(
  `/api/me/currently-playing-track`,
).then((response) => {
  if (!response.data) {
    navigateTo('/offline');
  }

  return response.data;
});
</script>
