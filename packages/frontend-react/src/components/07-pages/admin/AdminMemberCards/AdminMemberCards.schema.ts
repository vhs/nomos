import { zEmailAddress, zMemberCardSerialNumber } from '@/lib/validators/common'
import { z } from 'zod'

export const zRegisterGenuineCardForm = z.object({
    card: zMemberCardSerialNumber
})

export const zIssueGenuineCardForm = z.object({
    card: zMemberCardSerialNumber,
    ownerEmail: zEmailAddress
})
