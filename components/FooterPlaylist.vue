<template>
  <div class="flex justify-center">
    <NuxtLink
      :to="`/playlist/${playlist.id}`"
      class="text-xs text-gray-400 opacity-50 hover:text-white hover:opacity-100 transition-colors"
    >
      #{{ playlist.id }} | {{ playlist.snapshot_id }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

defineProps<{
  playlist: SimplifiedPlaylist
}>();
</script>
