<template>
  <footer class="bg-spotify-dark h-8 w-full z-20  bottom-0 flex flex-1 justify-between px-3">
    <a href="https://github.com/GabrielFavot/spotilive">
      <Icon class="text-spotify-lightgray hover:text-spotify-green" name="octicon:mark-github-16" />
    </a>
    <FooterContributors v-if="contributors" :contributors="contributors" />
    <div />
  </footer>
</template>

<script lang="ts" setup>
import FooterContributors from './FooterContributors.vue';

const { data: contributors } = await useFetch<{ login: string; html_url: string }[]>('https://api.github.com/repos/GabrielFavot/spotilive/contributors') ?? [];
</script>
