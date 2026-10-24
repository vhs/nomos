import type { ReactNode } from 'react'

import type { zAdminSystemPreferencesNewSchema, zSystemPreferenceSchema } from './SystemPreferences.schema'
import type { z } from 'zod'

export interface SystemPreferencesProps {
    children?: ReactNode
}

export type SystemPreferenceSchema = z.infer<typeof zSystemPreferenceSchema>

export type SystemPreferencesNewSchema = z.infer<typeof zAdminSystemPreferencesNewSchema>
