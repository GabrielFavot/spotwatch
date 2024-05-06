<template>
  <PlayingTrack
    v-if="playbackState"
    :playback-state="playbackState"
  />
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/currently-playing-track`,
).then((data) => {
  if (!data) {
    navigateTo('/offline');
  }

  return data;
});
</script>
