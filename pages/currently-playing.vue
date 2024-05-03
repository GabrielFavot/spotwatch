<template>
  <div class="grid place-items-center min-h-screen bg-gradient-to-b from-gray-800 to-green-900 p-5">
    <div class="bg-gray-900 shadow-lg rounded p-3">
      <div class="group relative">
        <img class="w-full md:w-72 block rounded" :src="albumCover" alt="">
      </div>
      <div class="p-5">
        <h3 class="text-white text-lg">
          {{ playedItem.name }}
        </h3>
        <p class="text-gray-400">
          {{ playedItem.artists.map((artist) => artist.name).join(', ') }}
        </p>
        <div class="pt-3">
          <div class="w-full  rounded-full bg-gray-700">
            <div class="bg-white text-xs font-medium  text-center p-0.5 leading-none rounded-full" :style="progressStyle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState, Track } from '@spotify/web-api-ts-sdk';

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/playback-state`,
);

const playedItem = computed<Track>(() => playbackState?.value?.item);

const albumCover = computed<string>(() => playedItem.value?.album.images[0].url);

const progress = computed<number>(() => {
  const progressMs = playbackState.value.progress_ms;
  const durationMs = playedItem.value.duration_ms;
  return (progressMs / durationMs) * 100;
});

const progressStyle = computed<string>(() => `width: ${progress.value}%`);
</script>
