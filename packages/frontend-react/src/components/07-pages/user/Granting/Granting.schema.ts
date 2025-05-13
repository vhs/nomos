import { z } from 'zod'

import { zAllowedPageSizes } from '@/components/06-integrated-pages/TablePage/TablePage.schema'

import { zPositiveNumber, zString } from '@/lib/validators/common'

export const zUserGrantingSchema = z.object({
    page: zPositiveNumber,
    pageSize: zAllowedPageSizes,
    query: zString,
    queryInput: zString,
    columns: zString,
    order: zString
})
