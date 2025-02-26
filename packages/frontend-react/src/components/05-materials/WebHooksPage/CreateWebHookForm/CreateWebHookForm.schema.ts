import { z } from 'zod'

import { zBoolean, zHTTPMethod, zNumber, zString } from '@/lib/validators/common'

export const CreateWebHookFormSchema = z.object({
    name: zString,
    description: zString,
    enabled: zBoolean,
    url: zString,
    translation: zString,
    headers: zString,
    method: zHTTPMethod,
    eventId: zNumber
})
