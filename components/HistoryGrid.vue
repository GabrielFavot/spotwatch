<template>
  <ul
    role="list"
    class="w-fit mx-auto grid grid-cols-2 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-4 bg-black pb-3"
  >
    <li
      v-for="item in historyItems ?? []"
      :key="item.track.id"
    >
      <TrackCard :track="item.track" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { PlayHistory } from '@spotify/web-api-ts-sdk';

const { historyItems } = defineProps<{
  historyItems: PlayHistory[]
}>();
</script>

<style>
</style>
