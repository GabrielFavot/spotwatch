<template>
  <div>
    <header>
      <nav class="bg-transparent w-full fixed z-20 top-4 full-w">
        <div
          id="navbar-sticky"
          class="flex justify-center"
        >
          <ul
            class="items-center px-4 gap-x-3 rounded-full flex bg-spotify-dark "
          >
            <li class="relative">
              <NuxtLink
                class="text-lg flex items-center gap-2 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-spotify-dark after:transition-opacity text-gray-500 hover:text-spotify-lightgray hover:underline"
                active-class="text-spotify-green font-bold"
                to="/history"
              >
                History
              </NuxtLink>
            </li>
            <li class="relative">
              <NuxtLink
                class="text-lg flex items-center gap-2 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-spotify-dark after:transition-opacity text-gray-500 hover:text-spotify-lightgray hover:underline"
                active-class="text-spotify-green font-bold"
                to="/daylist"
              >
                Daylist
              </NuxtLink>
            </li>
            <li class="relative">
              <NuxtLink
                class="text-lg flex items-center gap-2 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-spotify-dark after:transition-opacity text-gray-500 hover:text-spotify-lightgray hover:underline"
                active-class="text-spotify-green font-bold"
                to="/currently-playing"
              >
                Currently playing
                <div
                  v-if="playbackState?.is_playing"
                  class="w-4 h-4 bg-spotify-green rounded-full animate-pulse blur-sm"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
const { data: playbackState } = await useCurrentPlaybackState({ lazy: true });
</script>
