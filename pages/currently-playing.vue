<template>
  <div v-if="playedItem" class="relative grid place-items-center min-h-screen p-5">
    <div
      class="absolute inset-0 bg-cover filter blur-[50px] scale-125"
      :style="{ backgroundImage: `url(${playedItem.album.images[0].url})` }"
    />
    <div class="relative bg-spotify-dark shadow-lg rounded p-3 md:max-w-80">
      <img class="w-full md:w-74 block rounded" :src="playedItem.album.images[0].url" alt="">
      <div class="p-5">
        <h3 class="text-white text-lgt text-clip overflow-hidden">
          {{ playedItem.name }} {{ playedItem.explicit ? '🅴' : '' }}
        </h3>
        <p class="text-spotify-lightgray">
          {{ playedItem.artists.map((artist) => artist.name).join(', ') }}
        </p>
        <div class="pt-3">
          <div class="w-full  rounded-full bg-spotify-lightgray">
            <div class="bg-white text-xs font-medium  text-center p-0.5 leading-none rounded-full" :style="progressStyle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import type { PlaybackState, Track } from '@spotify/web-api-ts-sdk';

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/playback-state`,
);
const playedItem = computed<null | Track>(() => {
  const item = playbackState.value?.item;

  if (!item) return null;

  if ('album' in item) {
    return item;
  }

  return null;
});

const progress = computed<number>(() => {
  const progressMs = playbackState.value?.progress_ms ?? 0;
  const durationMs = playedItem.value?.duration_ms ?? Infinity;
  return (progressMs / durationMs) * 100;
});

const progressStyle = computed<CSSProperties>(() => ({
  width: `${progress.value}%`,
}));
</script>
