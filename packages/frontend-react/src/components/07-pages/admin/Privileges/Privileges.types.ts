import type { ReactNode } from 'react'

import type { zAdminPrivilegeItemSchema } from './Privileges.schema'
import type { z } from 'zod'

export interface PrivilegesProps {
    children?: ReactNode
}

export type AdminPrivilegeItemSchema = z.infer<typeof zAdminPrivilegeItemSchema>
