import { z } from 'zod'

import { zEmailAddress, zMemberCardSerialNumber } from '@/lib/validators/common'

export const zRegisterGenuineCardForm = z.object({
    card: zMemberCardSerialNumber
})

export const zIssueGenuineCardForm = z.object({
    card: zMemberCardSerialNumber,
    ownerEmail: zEmailAddress
})
