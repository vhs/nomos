import { z } from 'zod'

import { zBoolean, zCoerceNumber, zString } from '@/lib/validators/common'
import { zMembershipPeriod } from '@/lib/validators/records'

export const AdminMembershipsSchema = z.object({
    title: zString,
    code: zString,
    description: zString,
    price: zCoerceNumber,
    interval: zCoerceNumber,
    period: zMembershipPeriod,
    activeFlag: zBoolean,
    privateFlag: zBoolean,
    recurringFlag: zBoolean,
    trialFlag: zBoolean
})
