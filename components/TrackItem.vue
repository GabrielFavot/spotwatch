<template>
  <div
    class="flex items-center justify-between p-2 rounded-xl hover:bg-spotify-gray/30 transition-colors duration-200 group"
    @mouseleave="stopPreview"
  >
    <div class="flex items-center space-x-4">
      <div class="w-8 text-center relative">
        <span class="text-gray-300 group-hover:invisible">{{ trackNumber }}</span>
        <button
          v-if="track.preview_url"
          class="absolute inset-0 w-8 h-8 flex items-center justify-center text-white focus:outline-none opacity-0 group-hover:opacity-100"
          :title="isPlaying ? 'Pause preview' : 'Play preview'"
          @click.stop="togglePreview"
        >
          <Icon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" size="24" class="text-gray-300 hover:text-white transition-colors" />
        </button>
      </div>
      <img :src="track.album.images[0]?.url" alt="Album artwork" class="w-16 h-16 rounded-md">
      <div>
        <div class="flex items-center space-x-2">
          <h3 class="font-semibold">
            {{ track.name }}
          </h3>
          <a
            :href="track.external_urls.spotify"
            target="_blank"
            rel="noopener noreferrer"
            class="text-spotify-green hover:text-spotify-green-dark transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <Icon name="mdi:spotify" size="20" />
          </a>
        </div>
        <p class="text-sm text-gray-500">
          {{ track.artists.map(artist => artist.name).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Track } from '@spotify/web-api-ts-sdk';
import { onUnmounted, ref } from 'vue';

const props = defineProps({
  track: {
    type: Object as PropType<Track>,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
});

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

const createAudio = () => {
  if (!audio.value && props.track.preview_url) {
    audio.value = new Audio(props.track.preview_url);
    audio.value.addEventListener('ended', handleAudioEnded);
  }
};

const handleAudioEnded = () => {
  isPlaying.value = false;
};

const togglePreview = () => {
  createAudio();
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
      isPlaying.value = false;
    }
    else {
      audio.value.play();
      isPlaying.value = true;
    }
  }
};

const stopPreview = () => {
  if (audio.value && isPlaying.value) {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const cleanup = () => {
  if (audio.value) {
    audio.value.pause();
    audio.value.removeEventListener('ended', handleAudioEnded);
    audio.value = null;
  }
  isPlaying.value = false;
};

onUnmounted(cleanup);
</script>
