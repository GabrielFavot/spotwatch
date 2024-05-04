<template>
  <div class="relative grid place-items-center min-h-screen p-5">
    <div
      class="absolute inset-0 bg-cover filter blur-[50px] scale-125"
      :style="{ backgroundImage: `url(${playbackState.item.album?.images[0].url})` }"
    />
    <div class="relative bg-spotify-dark shadow-lg rounded p-3 md:max-w-80">
      <img class="w-full md:w-74 block rounded" :src="playbackState.item.album?.images[0].url" alt="">
      <div class="p-5">
        <h3 class="text-white text-lgt text-clip overflow-hidden">
          {{ playbackState.item.name }} {{ playbackState.item.explicit ? '🅴' : '' }}
        </h3>
        <div class="inline">
          <div :key="i" v-for:="(artist, i) in playbackState.item.artists">
            <a
              class=" text-spotify-lightgray inline"
              :href="artist.uri"
            >{{ artist.name }}</a>
            <span v-if="i < playbackState.item.artists.length - 1" class="text-spotify-lightgray px-2 inline hover:underline">•</span>
          </div>
        </div>
        <ProgressBar
          :progress-in-ms="playbackState.progress_ms"
          :duration-in-ms="playbackState.item.duration_ms"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';

const { playbackState } = defineProps({
  playbackState: {
    type: Object as PropType<PlaybackState>,
    required: true,
  },
});
</script>
