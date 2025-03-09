import type { ReactNode } from 'react'

import type { zCreateWebHookFormSchema } from './CreateWebHookForm.schema'
import type { z } from 'zod'

export interface CreateWebHookFormProps {
    children?: ReactNode
}

export type CreateWebHookFormSchema = z.infer<typeof zCreateWebHookFormSchema>
