<template>
  <PlayingTrack
    v-if="playbackState"
    :playback-state="playbackState"
  />
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';

definePageMeta({
  title: 'Currently Playing',
  middleware: 'offline-redirect',
});

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/currently-playing-track`,
);
</script>
