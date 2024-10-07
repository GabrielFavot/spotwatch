<template>
  <div class="bg-spotify-dark min-h-screen text-white">
    <div v-if="daylist" class="max-w-6xl mx-auto p-6">
      <DaylistHeader :daylist="daylist" />
      <PlaylistTrackList :tracks="daylist.tracks.items" />
      <FooterPlaylist :playlist="daylist" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: daylist } = await useFetch('/api/playlists/daylist');

if (!daylist.value) {
  navigateTo('/history');
}
</script>

<style>

</style>
