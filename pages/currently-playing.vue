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
definePageMeta({
  title: 'Currently Playing',
  middleware: 'offline-redirect',
});

const { pending, data: playbackState, refresh } = await useCurrentPlaybackState({ lazy: true });

useIntervalFn(refresh, 20_000);
</script>
