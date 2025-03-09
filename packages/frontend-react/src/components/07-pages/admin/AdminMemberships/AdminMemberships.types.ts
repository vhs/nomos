import type { ReactNode } from 'react'

import type { zAdminMembershipsSchema } from './AdminMemberships.schema'
import type { z } from 'zod'

import type { Membership } from '@/types/validators/records'

export interface AdminMembershipsProps {
    children?: ReactNode
    data: Membership
}

export type AdminMembershipsSchema = z.infer<typeof zAdminMembershipsSchema>
