import { z } from 'zod'

import { zString } from '@/lib/validators/common'

export const NewApiKeySchema = z.object({
    newApiKeyNote: zString
})
