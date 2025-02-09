import type { ReactNode } from 'react'

import type { Membership } from '@/types/records'

export interface AdminMembershipsItemProps {
    children?: ReactNode
    data: Membership
}
