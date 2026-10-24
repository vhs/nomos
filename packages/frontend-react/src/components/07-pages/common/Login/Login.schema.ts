import { z } from 'zod'

import { zString } from '@/lib/validators/common'

export const zLoginSchema = z.object({
    login: z.object({
        username: zString.min(3),
        password: zString.min(8).max(255)
    })
})
