<template>
  <div class="flex justify-center">
    <p class="text-xs text-gray-400 opacity-50">
      #{{ playlistId }} | {{ snapshotId }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  playlistId: string;
  snapshotId: string;
}>();
</script>