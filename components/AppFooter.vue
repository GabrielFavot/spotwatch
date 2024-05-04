<template>
  <footer class="bg-spotify-dark h-8 w-full z-20 fixed bottom-0 flex items-center justify-center">
    <Contributors :contributors="contributors" />
  </footer>
</template>

<script lang="ts" setup>
const { data: contributors } = await useFetch<{ login: string; html_url: string }[]>('https://api.github.com/repos/GabrielFavot/spotilive/contributors');
</script>
