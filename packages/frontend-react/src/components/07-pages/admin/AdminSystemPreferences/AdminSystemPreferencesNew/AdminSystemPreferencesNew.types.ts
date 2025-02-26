import type { AdminSystemPreferencesNewSchema } from './AdminSystemPreferencesNew.schema'
import type { z } from 'zod'

export interface AdminSystemPreferencesNewProps {}

export type AdminSystemPreferencesNewForm = z.infer<typeof AdminSystemPreferencesNewSchema>
