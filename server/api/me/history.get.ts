import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';
import { HISTORY_TRACK_STORAGE_KEY } from '~/server/tasks/history/refresh';

export default defineEventHandler(async (_event) => {
  const storage = useStorage('spotify');

  runTask('history:refresh');

  return storage.getItem<RecentlyPlayedTracksPage['items']>(HISTORY_TRACK_STORAGE_KEY);
});
