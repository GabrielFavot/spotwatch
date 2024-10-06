<template>
  <footer class="bg-spotify-dark h-8 w-full z-20 bottom-0 flex flex-1 justify-between px-3">
    <a href="https://github.com/GabrielFavot/spotwatch" target="_blank">
      <Icon class="text-spotify-lightgray hover:text-spotify-green" name="octicon:mark-github-16" />
    </a>
    <div class="flex flex-row items-center text-spotify-lightgray font-thin gap-2">
      <Icon name="ic:baseline-code" class="text-spotify-green" />
      <span>with</span>
      <Icon name="material-symbols:favorite-outline" class="text-red-400 animate-pulse" />
      <span>by</span>
      <a :href="'https://github.com/GabrielFavot'" target="_blank" class="hover:underline font-normal">Gab</a>
    </div>
    <div />
  </footer>
</template>

<script lang="ts" setup>
</script>
