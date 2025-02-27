import { z } from 'zod'

import { zEmailAddress } from '@/lib/validators/common'

export const UserGetInvolvedSchema = z.object({
    slackInvitationAddress: zEmailAddress
})
