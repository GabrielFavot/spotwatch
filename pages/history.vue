<template>
  <div>
    <HistoryGrid :history-items="tracks" />
    <div ref="sentinel" class="h-4" />
    <div
      v-if="pending"
      class="text-center py-4 text-gray-400"
    >
      Loading...
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SlimTrack } from '~/server/types/history'

const LIMIT = 50

const offset = ref(0)
const tracks = ref<SlimTrack[]>([])
const hasMore = ref(true)
const pending = ref(false)
const sentinel = ref<HTMLElement | null>(null)

async function loadMore() {
  if (pending.value || !hasMore.value) return
  pending.value = true
  try {
    const data = await $fetch('/api/me/history', {
      query: { offset: offset.value, limit: LIMIT },
    })
    tracks.value.push(...data.items)
    hasMore.value = data.hasMore
    offset.value += data.items.length
  }
  finally {
    pending.value = false
  }
}

await loadMore()

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting) loadMore()
})
</script>
