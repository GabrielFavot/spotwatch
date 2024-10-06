<template>
  <div
    class="shadow-md relative duration-500 hover:scale-105 hover:shadow-xl group rounded"
  >
    <div class="bg-gradient-to-b from-gray-300 to-gray-700">
      <img
        :src="albumImageUrl"
        :alt="trackFullName"
        class="group-hover:mix-blend-multiply"
        sizes="640px md:504px lg:308 xl:295 2xl:420"
        loading="lazy"
        @click="playAudio"
        @mouseleave="pauseAudio"
      >
      <div class="absolute bottom-0 b-0 px-4 py-3 hidden group-hover:block">
        <audio
          id="audio"
          ref="audioPlayer"
        >
          <source
            v-if="track.preview_url"
            :src="track.preview_url"
            type="audio/mpeg"
          >
        </audio>
        <a
          :href="trackUrl"
          target="_blank"
          class="text-spotify-green cursor-pointer text-lg"
        >
          <Icon name="logos:spotify-icon" />
        </a>
        <div>
          <span class="mr-3 uppercase text-xs text-gray-400">
            {{ track.album.name }}
          </span>
          <p class="text-sm font-bold text-spotify-lightgray block">
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
  track: Track
}>();

const albumImageUrl = computed(() => props.track.album.images[0].url);
const trackFullName = computed(
  () => `${props.track.artists[0].name} - ${props.track.name}`,
);
const trackUrl = computed(() => props.track.external_urls.spotify);

const audioPlayer = ref<HTMLAudioElement>();

const playAudio = () => {
  audioPlayer.value?.play();
};

const pauseAudio = () => {
  audioPlayer.value?.pause();
};
</script>
