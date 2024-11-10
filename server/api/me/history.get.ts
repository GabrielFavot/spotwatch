import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';
import { HISTORY_TRACK_STORAGE_KEY } from '~/server/tasks/history/refresh';

const MAX_HISTORY_ITEMS = 200;

export default defineEventHandler(async (_event) => {
  const storage = useStorage('spotify');

  runTask('history:refresh');

  const items = await storage.getItem<RecentlyPlayedTracksPage['items']>(HISTORY_TRACK_STORAGE_KEY, {
    defaultValue: [],
  });

  return items?.slice(0, MAX_HISTORY_ITEMS) ?? [];
});
