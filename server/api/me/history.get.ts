import { z } from 'zod'
import { getTracks, getTotal } from '~/server/utils/redis'

const querySchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(50),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse)

  runTask('history:refresh')

  const [items, total] = await Promise.all([
    getTracks(query.offset, query.limit),
    getTotal(),
  ])

  return {
    items,
    total,
    offset: query.offset,
    limit: query.limit,
    hasMore: query.offset + items.length < total,
  }
})
