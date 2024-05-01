<template>
  <ul 
    role="list"
    class="w-fit mx-auto grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-4 bg-black"
  >
    <li v-for="track in tracks">
      <TrackElement :track="track" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const config = useRuntimeConfig()

const api = SpotifyApi.withClientCredentials(
  config.public.clientId,
  config.public.clientSecret
);

const tracks = ref();

onMounted(async () => {
  const playlist = await api.playlists.getPlaylistItems(
    '5UXKoJlVp8icWqc9p7Cv0t'
  );
  tracks.value = playlist.items.map((item) => item.track);
});
</script>
