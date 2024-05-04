<template>
  <div class="pt-3">
    <div class="w-full  rounded-full bg-spotify-lightgray">
      <div class="bg-spotify-green text-xs font-medium  text-center p-0.5 leading-none rounded-full" :style="progressStyle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';

onMounted(() => {
  console.log('progressInMs', props.progressInMs);
  console.log('durationInMs', props.durationInMs);
});

const props = defineProps({
  progressInMs: {
    type: Number,
    required: true,
  },
  durationInMs: {
    type: Number,
    required: true,
  },
});

const progress = computed<number>(() => {
  return (props.progressInMs / props.durationInMs) * 100;
});

const progressStyle = computed<CSSProperties>(() => ({
  width: `${progress.value}%`,
}));
</script>
