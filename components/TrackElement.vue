<template>
  <div
    class="shadow-md relative hover:shadow-xl group rounded"
  >
    <div class="bg-gradient-to-b from-gray-300 to-gray-700 overflow-hidden">
      <img
        :src="albumImageUrl"
        :alt="trackFullName"
        class="group-hover:mix-blend-multiply group-hover:scale-105 duration-500"
      />

      <div class="absolute bottom-0 b-0 px-4 py-3 hidden group-hover:block">
        <a :href="trackUrl" class="text-green-400 cursor-pointer text-lg">
          <font-awesome-icon icon="fa-brands fa-spotify"></font-awesome-icon>
        </a>
        <div>
          <span class="mr-3 uppercase text-xs text-gray-400">
            {{ track.album.name }}
          </span>
          <p class="text-sm font-bold text-gray-200 block">
            {{ trackFullName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Track } from '@spotify/web-api-ts-sdk';

const props = defineProps<{
  track: Track;
}>();

const albumImageUrl = computed(() => props.track.album.images[0].url);
const trackFullName = computed(
  () => `${props.track.artists[0].name} - ${props.track.name}`
);
const trackUrl = computed(() => props.track.external_urls.spotify);
</script>
