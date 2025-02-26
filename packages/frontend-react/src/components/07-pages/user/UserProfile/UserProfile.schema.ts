import { z } from 'zod'

import { zBoolean, zEmailAddress, zHumanName, zPasswordInput, zUsername } from '@/lib/validators/common'

export const UserProfileSchema = z.object({
    user: z
        .object({
            userName: zUsername,
            firstName: zHumanName,
            lastName: zHumanName,
            newsletter: zBoolean,
            cashMember: zBoolean,
            email: zEmailAddress,
            paypalEmail: zEmailAddress,
            stripeEmail: zEmailAddress
        })
        .required(),
    password: zPasswordInput
})
