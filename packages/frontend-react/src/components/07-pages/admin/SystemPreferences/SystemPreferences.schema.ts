import { z } from 'zod'

import { zBoolean, zEmptyOrMinString, zMinString } from '@/lib/validators/common'

export const zSystemPreferenceSchema = z.object({
    key: zMinString,
    value: zEmptyOrMinString,
    enabled: zBoolean,
    notes: zEmptyOrMinString
})

export const zAdminSystemPreferencesNewSchema = zSystemPreferenceSchema
