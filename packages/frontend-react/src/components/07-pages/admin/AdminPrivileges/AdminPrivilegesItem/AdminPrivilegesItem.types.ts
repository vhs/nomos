import type { ReactNode } from 'react'

import type { Privilege } from '@/types/validators/records'

export interface AdminPrivilegesItemProps {
    children?: ReactNode
    data: Privilege
}

export type * from '../AdminPrivileges.types'
