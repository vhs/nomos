import { z } from 'zod'

import { zBoolean, zString, zStringArray } from '@/lib/validators/common'

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
export type Filters = Filter[]

export const isFilter = (inp: unknown): inp is Filter => zFilter.safeParse(inp).success

export const zFieldDefinition = z.object({
    title: zString,
    field: z.union([zString, zStringArray]),
    hidden: zBoolean.nullish()
})

export const zFilterDefinition = z.object({
    id: zString,
    label: zString,
    filter: zFilter
})

export interface FilterDefinition<T extends string = string> extends z.infer<typeof zFilterDefinition> {
    id: T
}

export type FilterDefinitions<T extends string = string> = Array<FilterDefinition<T>>

export interface FieldDefinition<T extends string = string> extends z.infer<typeof zFieldDefinition> {
    title: T
}

export type FieldDefinitions<T extends string = string> = Array<FieldDefinition<T>>
