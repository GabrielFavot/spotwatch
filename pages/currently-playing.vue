<template>
  <div>
    <div v-if="playedItem">
      {{ playedItem.name }}
    </div>
    <div v-else>
      <p>Nothing is currently playing</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';

const { data: playbackState } = await useLazyFetch<PlaybackState>(`/api/me/playback-state`);

const playedItem = computed(() => playbackState?.value?.item);
</script>
