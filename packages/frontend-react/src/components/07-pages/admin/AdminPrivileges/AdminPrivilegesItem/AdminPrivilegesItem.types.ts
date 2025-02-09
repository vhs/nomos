import type { ReactNode } from 'react'

import type { Privilege } from '@/types/records'

export interface AdminPrivilegesItemProps {
    children?: ReactNode
    data: Privilege
}
