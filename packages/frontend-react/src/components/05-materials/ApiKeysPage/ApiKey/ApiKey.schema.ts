import { z } from 'zod'

import { zDateTime, zString } from '@/lib/validators/common'

export const ApiKeyEditSchema = z.object({
    key: zString,
    value: zString,
    notes: zString,
    expiry: zDateTime
})
