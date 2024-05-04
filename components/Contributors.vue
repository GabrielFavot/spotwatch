<template>
  <div class="flex flex-row items-center text-spotify-lightgray font-thin gap-2">
    <Icon name="ic:baseline-code" class="text-spotify-green" />
    <span>with</span>
    <Icon class="text-red-400 animate-pulse" name="material-symbols:favorite-outline" />
    <span>and</span>
    <Icon class="text-yellow-400" name="ph:beer-stein" />
    <span>by</span>
    <a :href="randomContributor?.url" class="hover:underline font-normal">{{ randomContributor?.login }}</a>
  </div>
</template>

<script lang="ts" setup>
const { contributors } = defineProps(
  {
    contributors: Array as PropType<{ login: string; url: string }[]>,
  },
);

const randomContributor = computed(() => {
  if (!contributors) return null;
  return contributors[Math.floor(Math.random() * contributors.length)];
});
</script>
