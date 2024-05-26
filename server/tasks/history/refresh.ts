import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';

export const HISTORY_TRACK_STORAGE_KEY = 'history:tracks';
export const HISTORY_LENGTH_STORAGE_KEY = 'history:length';

export default defineTask({
  meta: {
    name: 'history:load',
    description: 'Loads history of played songs',
  },
  async run() {
    console.log('Running history:load task');
    console.log(process.env);

    const spotify = await useSpotify();
    const storage = useStorage('spotify');

    const storedTracks = await storage.getItem<RecentlyPlayedTracksPage['items']>(HISTORY_TRACK_STORAGE_KEY);
    console.log('Stored tracks:', storedTracks?.length);
    const queryRange = computeCursor(storedTracks ?? []);

    const latestTracks = await spotify.player.getRecentlyPlayedTracks(50, queryRange);

    const history = storedTracks ? latestTracks.items.concat(...storedTracks) : latestTracks.items;
    await storage.setItem(HISTORY_TRACK_STORAGE_KEY, history);
    await storage.setItem(HISTORY_LENGTH_STORAGE_KEY, history.length);

    return {
      result: {
        size: history.length,
      },
    };
  },
});

function computeCursor(history: RecentlyPlayedTracksPage['items']): { timestamp: number, type: 'before' | 'after' } {
  const lastSong = history[0];

  if (!lastSong) {
    return { timestamp: Date.now(), type: 'before' };
  }

  return { timestamp: new Date(lastSong.played_at).getTime(), type: 'after' };
}
