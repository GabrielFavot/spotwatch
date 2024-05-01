import { z } from 'zod'
import { getCachedAccessToken, useSpotify } from '~/server/composables/spotify'

const paramsSchema = z.object({
  playlistId: z.string(),
})

export default defineEventHandler(async (event) => {
  const { playlistId } = await getValidatedRouterParams(event, paramsSchema.parse)
  const spotify = useSpotify(await getCachedAccessToken())

  return spotify.playlists.getPlaylistItems(playlistId, 'FR', undefined)
})
