import { z } from 'zod'

import { zPositiveNumber, zBooleanRecord, zString } from '@/lib/validators/common'

export const zAllowedPageSizes = z.union([
    z.literal(10),
    z.literal(20),
    z.literal(50),
    z.literal(100),
    z.literal(1000),
    z.literal(10000)
])

export const TablePageSchema = z.object({
    search: z.object({
        columns: zString,
        order: zString,
        orderInput: zString,
        page: zPositiveNumber,
        pageSize: zAllowedPageSizes,
        query: zString,
        queryInput: zString
    }),
    fieldStates: zBooleanRecord,
    primaryFilterStates: zBooleanRecord,
    secondaryFilterStates: zBooleanRecord
})

export type TablePageForm = z.infer<typeof TablePageSchema>

export type AllowedPageSizes = z.infer<typeof zAllowedPageSizes>

const zTablePageSchemaType = z.object({
    shape: z.object({
        search: z.object({
            shape: z.object({
                columns: z.object({}),
                order: z.object({}),
                orderInput: z.object({}),
                page: z.object({}),
                pageSize: z.object({}),
                query: z.object({}),
                queryInput: z.object({})
            })
        }),
        fieldStates: z.object({}),
        primaryFilterStates: z.object({}),
        secondaryFilterStates: z.object({})
    })
})

export type TablePageSchemaType = typeof TablePageSchema

export const isTablePageSchemaType = (inp: unknown): inp is TablePageSchemaType => {
    return zTablePageSchemaType.safeParse(inp).success
}
