<template>
  <ul
    role="list"
    class="w-fit mx-auto grid grid-cols-2 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-4 bg-black pb-3"
  >
    <li
      v-for="item in historyItems ?? []"
      :key="item.id + item.played_at"
    >
      <TrackCard :track="item" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { SlimTrack } from '~/server/types/history'

const { historyItems } = defineProps<{
  historyItems: SlimTrack[]
}>()
</script>
