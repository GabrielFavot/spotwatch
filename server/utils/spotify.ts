import { ProvidedAccessTokenStrategy, SpotifyApi, emptyAccessToken, type AccessToken } from '@spotify/web-api-ts-sdk';

const storageKey = 'spotify_access_token';

let refreshPromise: Promise<AccessToken> | null = null;

export async function useSpotify() {
  const { clientId, clientSecret, refreshToken: configRefreshToken } = useRuntimeConfig().spotify;

  const storage = useStorage();
  const accessToken = await getCachedAccessToken();

  const refresh = async (clientId: string, accessToken: AccessToken) => {
    // Deduplicate concurrent refresh calls
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const currentRefreshToken = accessToken.refresh_token || configRefreshToken;
        if (!currentRefreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await $fetch<AccessToken>('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: currentRefreshToken,
          }),
        });

        // Preserve the refresh_token — Spotify doesn't always return one
        response.refresh_token = response.refresh_token || currentRefreshToken;
        response.expires = Date.now() + (response.expires_in * 1000);
        await storage.setItem(storageKey, response);

        return response;
      }
      finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  };

  const strategy = new ProvidedAccessTokenStrategy(clientId, accessToken, refresh);

  return new SpotifyApi(strategy, {});
}

export async function getCachedAccessToken() {
  const { refreshToken } = useRuntimeConfig().spotify;
  const value = await useStorage().getItem<AccessToken>(storageKey);
  return value ?? { ...emptyAccessToken, refresh_token: refreshToken };
}
