<template>
  <footer class="bg-spotify-dark h-8 w-full z-20 fixed bottom-0">
    <div class="flex flex-row justify-around w-full">
      <span class="text-spotify-lightgray"><Icon name="ic:baseline-code" class="text-spotify-green" /> with <Icon class="text-red-400 animate-pulse" name="material-symbols:favorite-outline" /> and  by <a :href="randomContributor?.url" class="hover:underline capitalize">{{ randomContributor?.login }}</a> </span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { data: contributors } = await useFetch<{ login: string, html_url: string }[]>('https://api.github.com/repos/GabrielFavot/spotilive/contributors');

const randomContributor = useState(() => {
  if (!contributors.value) return null;

  const randomContributor = contributors.value[Math.floor(Math.random() * contributors.value.length)];

  return {
    login: randomContributor.login,
    url: randomContributor.html_url,
  };
});
</script>
