<template>
  <ul
    role="list"
    class="w-fit mx-auto grid grid-cols-1 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-4 bg-black"
  >
    <li
      v-for="item in tracks?.items ?? []"
      :key="item.track.id"
    >
      <TrackElement :track="item.track" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { data: tracks } = await useLazyFetch(`/api/me/history`);
</script>
