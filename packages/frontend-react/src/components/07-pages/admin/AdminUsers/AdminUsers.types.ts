import type { ReactNode } from 'react'

import type { AdminUsersEditSchema, zAdminUsersColumns } from './AdminUsers.schema'
import type { z } from 'zod'

export interface AdminUsersProps {
    children?: ReactNode
}

export type AdminUsersColumns = z.infer<typeof zAdminUsersColumns>

export type AdminUsersEditForm = z.infer<typeof AdminUsersEditSchema>
