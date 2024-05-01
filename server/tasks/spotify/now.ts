import { getCachedAccessToken, useSpotify } from '~/server/composables/spotify'

export default defineTask({
  meta: {
    name: 'spotify:now',
    description: 'Returns currently playing song',
  },
  async run() {
    const accessToken = await getCachedAccessToken()
    const spotify = useSpotify(accessToken)

    const playingNow = await spotify.player.getCurrentlyPlayingTrack()

    return {
      result: playingNow,
    }
  },
})
