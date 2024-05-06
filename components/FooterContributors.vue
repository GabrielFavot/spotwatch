<template>
  <div :v-if="contributors?.length" class="flex flex-row items-center text-spotify-lightgray font-thin gap-2">
    <Icon name="ic:baseline-code" class="text-spotify-green" />
    <span>with</span>
    <Icon name="material-symbols:favorite-outline" class="text-red-400 animate-pulse" />
    <span>by</span>
    <a :href="contributors[index]?.html_url" class="hover:underline font-normal">{{ contributors[index]?.login }}</a>
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';

const { contributors } = defineProps({
  contributors: {
    type: Array as PropType<{ login: string; html_url: string }[]>,
    required: true,
  },
});
const index = ref(0);

useIntervalFn(() => {
  index.value = (index.value + 1) % contributors.length;
}, 3000);
</script>
