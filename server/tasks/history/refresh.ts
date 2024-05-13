import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';

export const HISTORY_TRACK_STORAGE_KEY = 'history:tracks';

export default defineTask({
  meta: {
    name: 'history:load',
    description: 'Loads history of played songs',
  },
  async run() {
    const spotify = await useSpotify();

    const storedTracks = await useStorage().getItem<RecentlyPlayedTracksPage['items']>(HISTORY_TRACK_STORAGE_KEY);
    const queryRange = computeCursor(storedTracks ?? []);

    const latestTracks = await spotify.player.getRecentlyPlayedTracks(50, queryRange);

    console.log('Fetched', latestTracks.items.length, 'new songs');

    const history = storedTracks ? latestTracks.items.concat(...storedTracks) : latestTracks.items;
    await useStorage().setItem('tracks', history);

    return {
      result: {
        size: history.length,
        latestTracks: latestTracks.items,
      },
    };
  },
});

function computeCursor(history: RecentlyPlayedTracksPage['items']): { timestamp: number; type: 'before' | 'after' } {
  const lastSong = history[0];

  if (!lastSong) {
    return { timestamp: Date.now(), type: 'before' };
  }

  return { timestamp: new Date(lastSong.played_at).getTime(), type: 'after' };
}
