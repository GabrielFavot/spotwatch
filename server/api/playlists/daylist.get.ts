export default defineEventHandler(async () => {
  const spotify = await useSpotify();

  const playlists = await spotify.currentUser.playlists.playlists();
  const daylist = playlists.items.find(playlist => playlist.name.startsWith('daylist'));

  if (!daylist?.id) {
    return undefined;
  }

  return spotify.playlists.getPlaylist(daylist.id, 'FR');
});
