<template>
  <div>
    <div v-if="pending" class="bg-spotify-dark min-h-screen grid place-items-center">
      <div class="text-center">
        <h1 class="text-4xl text-spotify-green">
          Loading...
        </h1>
      </div>
    </div>
    <PlayingTrack
      v-if="playbackState"
      :playback-state="playbackState"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';
import { useIntervalFn } from '@vueuse/core';

definePageMeta({
  title: 'Currently Playing',
  middleware: 'offline-redirect',
});

const { pending, data: playbackState } = await useLazyFetch<PlaybackState>(`/api/me/currently-playing-track`);

useIntervalFn(async () => {
  const { data } = await useLazyFetch<PlaybackState>(`/api/me/currently-playing-track`);
  playbackState.value = data.value;
  pending.value = false;
}, 5000);
</script>
