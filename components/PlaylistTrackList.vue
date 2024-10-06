<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <TrackItem
        v-for="({ track }, index) in tracks"
        :key="track?.id"
        :track="track"
        :track-number="index + 1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Playlist, Track } from '@spotify/web-api-ts-sdk';

defineProps({
  tracks: {
    type: Array as PropType<Playlist<Track>['tracks']['items'] | Track[]>,
    required: true,
  },
});
</script>
