import type { ReactNode } from 'react'

import type { zAdminSystemPreferencesNewSchema, zSystemPreferenceSchema } from './AdminSystemPreferences.schema'
import type { z } from 'zod'

export interface AdminSystemPreferencesProps {
    children?: ReactNode
}

export type SystemPreferenceSchema = z.infer<typeof zSystemPreferenceSchema>

export type AdminSystemPreferencesNewSchema = z.infer<typeof zAdminSystemPreferencesNewSchema>
