import type { ReactNode } from 'react'

import type { AdminMembershipsSchema } from './AdminMemberships.schema'
import type { z } from 'zod'

import type { Membership } from '@/types/records'

export interface AdminMembershipsProps {
    children?: ReactNode
    data: Membership
}

export type AdminMembershipsForm = z.infer<typeof AdminMembershipsSchema>
