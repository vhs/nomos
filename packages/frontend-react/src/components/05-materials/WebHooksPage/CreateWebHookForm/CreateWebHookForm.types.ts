import type { ReactNode } from 'react'

import type { CreateWebHookFormSchema } from './CreateWebHookForm.schema'
import type { z } from 'zod'

export interface CreateWebHookFormProps {
    children?: ReactNode
}

export type CreateWebHookFormTypes = z.infer<typeof CreateWebHookFormSchema>
