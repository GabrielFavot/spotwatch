import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk'
import type { SlimTrack } from '~/server/types/history'
import { addTracks, getLatestPlayedAt } from '~/server/utils/redis'

export default defineTask({
  meta: {
    name: 'history:refresh',
    description: 'Loads history of played songs into Redis',
  },
  async run() {
    const spotify = await useSpotify()

    const latestScore = await getLatestPlayedAt()
    const queryRange = latestScore
      ? { timestamp: latestScore, type: 'after' as const }
      : { timestamp: Date.now(), type: 'before' as const }

    const response = await spotify.player.getRecentlyPlayedTracks(50, queryRange)
    const slimTracks = response.items.map(toSlimTrack)
    const added = await addTracks(slimTracks)

    return { result: { fetched: response.items.length, added } }
  },
})

function toSlimTrack(item: RecentlyPlayedTracksPage['items'][number]): SlimTrack {
  const track = item.track
  return {
    id: track.id,
    name: track.name,
    artist: track.artists[0]?.name ?? '',
    album: track.album.name,
    image_url: track.album.images[0]?.url ?? '',
    spotify_url: track.external_urls.spotify,
    preview_url: track.preview_url ?? null,
    played_at: item.played_at,
  }
}
