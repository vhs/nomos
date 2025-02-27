import type { ReactNode } from 'react'

import type { AdminPrivilegeItemSchema } from './AdminPrivileges.schema'
import type { z } from 'zod'

export interface AdminPrivilegesProps {
    children?: ReactNode
}

export type AdminPrivilegeItemForm = z.infer<typeof AdminPrivilegeItemSchema>
