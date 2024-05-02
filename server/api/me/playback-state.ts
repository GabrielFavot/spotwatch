export default defineEventHandler(async (event) => {
  const spotify = await useSpotify();

  return spotify.player.getCurrentlyPlayingTrack();
});
