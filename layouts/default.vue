<template>
  <div>
    <header>
      <nav class="bg-transparent w-full fixed z-20 top-4 full-w">
        <div class="flex justify-center" id="navbar-sticky">
          <ul
            class="items-center ring-1 ring-green-400 px-4 gap-x-3 rounded-full hidden lg:flex bg-black"
          >
            <li class="relative">
              <NuxtLink
                class="text-lg flex items-center gap-2 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 after:transition-opacity text-gray-500 hover:text-gray-200 hover:underline"
                :class="isActive('/history') ? 'text-green-400' : ''"
                to="/history"
                >History</NuxtLink
              >
            </li>
            <li class="relative">
              <NuxtLink
                to="/currently-playing"
                class="text-lg flex items-center gap-2 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 after:transition-opacity text-gray-500 hover:text-gray-200 hover:underline"
                :class="
                  isActive('/currently-playing')
                    ? 'text-green-400 font-bold'
                    : ''
                "
                >Currently playing
              <div
                v-if="playbackState?.is_playing"
                class="w-4 h-4 bg-green-400 rounded-full animate-pulse blur-sm"
              ></div>
              </NuxtLink
              >
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import type { PlaybackState } from '@spotify/web-api-ts-sdk';
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

const { data: playbackState } = await useLazyFetch<PlaybackState>(
  `/api/me/playback-state`
);
</script>
