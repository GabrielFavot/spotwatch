import Redis from 'ioredis'
import type { SlimTrack } from '~/server/types/history'

export const HISTORY_KEY = 'history:tracks'

let _redis: Redis | null = null

export function useRedis(): Redis {
  if (!_redis) {
    const { redisUrl } = useRuntimeConfig()
    _redis = new Redis(redisUrl as string)
  }
  return _redis
}

export async function getLatestPlayedAt(): Promise<number | null> {
  const result = await useRedis().zrevrange(HISTORY_KEY, 0, 0, 'WITHSCORES')
  return result.length ? Number(result[1]) : null
}

export async function addTracks(tracks: SlimTrack[]): Promise<number> {
  if (!tracks.length) return 0
  const args: (string | number)[] = []
  for (const t of tracks) {
    args.push(new Date(t.played_at).getTime(), JSON.stringify(t))
  }
  return useRedis().zadd(HISTORY_KEY, 'NX', ...args) as Promise<number>
}

export async function getTracks(offset: number, limit: number): Promise<SlimTrack[]> {
  const raw = await useRedis().zrevrange(HISTORY_KEY, offset, offset + limit - 1)
  return raw.map(s => JSON.parse(s) as SlimTrack)
}

export async function getTotal(): Promise<number> {
  return useRedis().zcard(HISTORY_KEY)
}
