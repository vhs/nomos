import { z } from 'zod'

import { zString } from '@/lib/validators/common'

export const LoginSchema = z.object({
    login: z.object({
        username: zString.min(3),
        password: zString.min(8).max(255)
    })
})
