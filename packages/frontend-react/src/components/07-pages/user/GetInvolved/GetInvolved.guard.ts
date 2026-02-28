import { z } from 'zod'

import { zEmailAddress } from '@/lib/validators/common'

export const GetInvolvedSchema = z.object({
    slackInvitationAddress: zEmailAddress
})
