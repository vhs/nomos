import type { ReactNode } from 'react'

import type { Membership } from '@/types/validators/records'

export interface AdminMembershipsItemProps {
    children?: ReactNode
    data: Membership
}
