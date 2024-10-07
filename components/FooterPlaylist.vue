<template>
  <div class="flex justify-center">
    <a
      :href="`https://open.spotify.com/playlist/${playlist.id}`"
      target="_blank"
      class="text-xs text-gray-400 opacity-50 hover:text-white hover:opacity-100 transition-colors"
    >
      #{{ playlist.id }} | {{ playlist.snapshot_id }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

defineProps<{
  playlist: SimplifiedPlaylist
}>();
</script>
