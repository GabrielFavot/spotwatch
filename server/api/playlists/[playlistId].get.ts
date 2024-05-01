import { z } from 'zod';

const paramsSchema = z.object({
  playlistId: z.string(),
});

export default defineEventHandler(async (event) => {
  const { playlistId } = await getValidatedRouterParams(event, paramsSchema.parse);
  const spotify = await useSpotify();

  return spotify.playlists.getPlaylistItems(playlistId, 'FR', undefined);
});
