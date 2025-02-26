import type { ReactNode } from 'react'

import type { SystemPreferenceSchema } from './AdminSystemPreferencesEdit.schema'
import type { z } from 'zod'

export interface AdminSystemPreferencesEditProps {
    children?: ReactNode
}

export type SystemPreferenceForm = z.infer<typeof SystemPreferenceSchema>
