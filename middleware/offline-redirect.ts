export default defineNuxtRouteMiddleware(async () => {
  const { data: playbackState } = await useFetch('/api/me/currently-playing-track');

  if (playbackState.value?.is_playing) {
    console.log('User is currently playing a track');
    return;
  }

  console.log('User is not currently playing a track');
  return navigateTo('/offline');
});
