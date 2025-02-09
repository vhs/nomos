import type { ReactNode } from 'react'

import type { Membership } from '@/types/records'

export interface AdminMembershipsProps {
    children?: ReactNode
    data: Membership
}
