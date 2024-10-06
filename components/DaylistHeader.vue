<template>
  <div class="flex flex-col items-center mb-12">
    <img
      v-if="daylist.images.length > 0"
      :src="daylist.images[0].url"
      :alt="daylist.name"
      class="w-full max-w-2xl h-64 object-cover rounded-lg mb-8"
    >
    <h1 class="text-5xl font-bold mb-4 text-center">
      {{ daylist.name }}
    </h1>
    <p class="text-description" v-html="daylist.description" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  daylist: {
    name: string
    description: string
    images: { url: string }[]
  }
}>();
</script>

<style>
.text-description a {
  @apply text-spotify-green hover:text-spotify-green/80;
}
</style>
