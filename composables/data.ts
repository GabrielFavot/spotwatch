import type { PlaybackState } from '@spotify/web-api-ts-sdk';

interface UseCurrentPlaybackStateOptions {
  lazy?: boolean;
}

export const useCurrentPlaybackState = (options: UseCurrentPlaybackStateOptions = {
  lazy: false,
}) => {
  return useFetch<PlaybackState>('/api/me/currently-playing-track', {
    key: 'playbackState',
    lazy: options.lazy,
  });
};
