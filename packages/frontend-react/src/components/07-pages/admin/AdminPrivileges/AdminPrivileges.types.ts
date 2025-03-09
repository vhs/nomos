import type { ReactNode } from 'react'

import type { zAdminPrivilegeItemSchema } from './AdminPrivileges.schema'
import type { z } from 'zod'

export interface AdminPrivilegesProps {
    children?: ReactNode
}

export type AdminPrivilegeItemSchema = z.infer<typeof zAdminPrivilegeItemSchema>
