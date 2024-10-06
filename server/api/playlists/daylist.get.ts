export default defineEventHandler(async () => {
  const spotify = await useSpotify();

  // const playlists = await spotify.currentUser.playlists.playlists();

  // const daylistId = playlists.items.find(playlist => playlist.name.startsWith('daylist'))?.id;

  const daylistId = '37i9dQZF1EP6YuccBxUcC1';

  if (!daylistId) {
    return undefined;
  }

  return await spotify.playlists.getPlaylist(daylistId);
});
