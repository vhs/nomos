import { z } from 'zod'

import { zString } from '@/lib/validators/common'

export const zQueryFilterLogicalOperators = z.union([z.literal('and'), z.literal('or')])

export type QueryFilterLogicalOperators = z.infer<typeof zQueryFilterLogicalOperators>

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

export type QueryFilterValueOperators = z.infer<typeof zQueryFilterValueOperators>

export const zQueryFilterObject = z.object({
    column: zString,
    operator: zQueryFilterValueOperators,
    value: z.unknown()
})

export type QueryFilterObject = z.infer<typeof zQueryFilterObject>

export const zBaseQueryFilterComp = z.object({
    operator: zQueryFilterLogicalOperators
})

export type QueryFilterComp = z.infer<typeof zBaseQueryFilterComp> & {
    left: QueryFilterObject | QueryFilterComp
    right: QueryFilterObject | QueryFilterComp | null
}

export const zQueryFilterComp: z.ZodType<QueryFilterComp> = zBaseQueryFilterComp.extend({
    left: z.lazy(() => z.union([zQueryFilterObject, zQueryFilterComp])),
    operator: zQueryFilterLogicalOperators,
    right: z.lazy(() => z.union([zQueryFilterObject, zQueryFilterComp, z.null()]))
})

export const zFilter = z.union([zQueryFilterObject, zQueryFilterComp])

export type Filter = z.infer<typeof zFilter>

export const isFilter = (inp: unknown): inp is Filter => zFilter.safeParse(inp).success
