import { z } from 'zod'

import { zBoolean, zString } from '@/lib/validators/common'

export const AdminSystemPreferencesNewSchema = z.object({
    key: zString,
    value: zString,
    enabled: zBoolean,
    notes: zString
})
