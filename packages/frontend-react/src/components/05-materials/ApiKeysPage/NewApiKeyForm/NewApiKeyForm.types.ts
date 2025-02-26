import type { ReactNode } from 'react'

import type { NewApiKeySchema } from './NewApiKeyForm.schema'
import type { z } from 'zod'

export interface NewApiKeyFormProps {
    children?: ReactNode
    show?: boolean
    onHide: () => void
    onCreate: (note: string) => void
}

export type NewApiKeySchemaType = z.infer<typeof NewApiKeySchema>
