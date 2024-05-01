import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { z } from 'zod';

const querySchema = z.object({
  code: z.string(),
});

export default defineEventHandler(async (event) => {
  const { code } = await getValidatedQuery(event, querySchema.parse);
  const { spotify, public: { hostname } } = useRuntimeConfig();
  const { clientId, clientSecret, redirectUri } = spotify;

  const response = await $fetch<AccessToken>('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: encodeURI(hostname + redirectUri),
    }),
  });

  return response;
});
