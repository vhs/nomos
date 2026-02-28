import type { ReactNode } from 'react'

import type {
    zAdminUsersCreateSchema,
    zAdminUsersEditPasswordSchema,
    zAdminUsersEditProfileSchema,
    zAdminUsersColumns
} from './Users.schema'
import type { z } from 'zod'

export interface UsersProps {
    children?: ReactNode
}

export type UsersColumns = z.infer<typeof zAdminUsersColumns>

export type UsersCreateSchema = z.infer<typeof zAdminUsersCreateSchema>
export type UsersEditPasswordSchema = z.infer<typeof zAdminUsersEditPasswordSchema>
export type UsersEditProfileSchema = z.infer<typeof zAdminUsersEditProfileSchema>
