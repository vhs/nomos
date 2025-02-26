import { z } from 'zod'

import { zBoolean, zNumber, zString } from '@/lib/validators/common'
import { zMembershipPeriod } from '@/lib/validators/records'

export const AdminMembershipsSchema = z.object({
    title: zString,
    code: zString,
    description: zString,
    price: zNumber,
    interval: zNumber,
    period: zMembershipPeriod,
    activeFlag: zBoolean,
    privateFlag: zBoolean,
    recurringFlag: zBoolean,
    trialFlag: zBoolean
})
