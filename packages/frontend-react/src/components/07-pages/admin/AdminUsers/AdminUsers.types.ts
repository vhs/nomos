import type { ReactNode } from 'react'

import type {
    zAdminUsersCreateSchema,
    zAdminUsersEditPasswordSchema,
    zAdminUsersEditProfileSchema,
    zAdminUsersColumns
} from './AdminUsers.schema'
import type { z } from 'zod'

export interface AdminUsersProps {
    children?: ReactNode
}

export type AdminUsersColumns = z.infer<typeof zAdminUsersColumns>

export type AdminUsersCreateSchema = z.infer<typeof zAdminUsersCreateSchema>
export type AdminUsersEditPasswordSchema = z.infer<typeof zAdminUsersEditPasswordSchema>
export type AdminUsersEditProfileSchema = z.infer<typeof zAdminUsersEditProfileSchema>
