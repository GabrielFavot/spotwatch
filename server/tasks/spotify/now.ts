export default defineTask({
  meta: {
    name: 'spotify:now',
    description: 'Returns currently playing song',
  },
  async run() {
    const spotify = await useSpotify();

    const playingNow = await spotify.player.getCurrentlyPlayingTrack();

    return {
      result: playingNow,
    };
  },
});
