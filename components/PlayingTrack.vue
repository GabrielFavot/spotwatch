<template>
  <div v-if="playedItem" class="relative grid place-items-center min-h-screen p-5">
    <div
      class="absolute inset-0 bg-cover filter blur-[50px] scale-125"
      :style="{ backgroundImage: `url(${playedItem.album.images[0].url})` }"
    />
    <div class="relative bg-spotify-dark shadow-lg rounded p-3 md:max-w-80">
      <img class="w-full md:w-74 block rounded" :src="playedItem.album.images[0].url" :alt="playedItem.album.name">
      <div class="p-5">
        <h3 class="text-white text-lgt text-clip overflow-hidden">
          {{ playedItem.name }} {{ playedItem.explicit ? '🅴' : '' }}
        </h3>
        <span :key="i" v-for:="(artist, i) in playedItem.artists">
          <a
            class=" text-spotify-lightgray inline hover:underline"
            :href="artist.uri"
            target="_blank"
          >{{ artist.name }}</a>
          <span v-if="i < playedItem.artists.length - 1" class="text-spotify-lightgray px-2 inline hover:underline">•</span>
        </span>
        <ProgressBar
          :progress-in-ms="playbackState.progress_ms"
          :duration-in-ms="playedItem.duration_ms"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState, Track } from '@spotify/web-api-ts-sdk';

const props = defineProps<{
  playbackState: PlaybackState;
}>();

const playedItem = computed<Track | null>(() => {
  const item = props.playbackState.item;

  if ('album' in item) {
    return item;
  }

  return null;
});
</script>
