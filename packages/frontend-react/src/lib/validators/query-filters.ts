import { z } from 'zod'

export const zQueryFilterLogicalOperators = z.union([z.literal('and'), z.literal('or')])

export const zQueryFilterValueOperators = z.union([
    z.literal('='),
    z.literal('!='),
    z.literal('>'),
    z.literal('<'),
    z.literal('>='),
    z.literal('<='),
    z.literal('like'),
    z.literal('is null'),
    z.literal('is not null')
])

export const zQueryFilterObject = z.object({
    column: z.string(),
    operator: zQueryFilterValueOperators,
    value: z.unknown()
})

export const zQueryFilterMatch = z.object({
    left: z.union([zQueryFilterObject, z.object({})]),
    operator: zQueryFilterLogicalOperators,
    right: z.union([zQueryFilterObject, z.object({})])
})

export const zQueryFilter = z.union([zQueryFilterObject, zQueryFilterMatch])
