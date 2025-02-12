import type { ReactNode } from 'react'

import type { Privileges } from '@/types/records'

export interface PrivilegesListProps {
    children?: ReactNode
    keyPrivileges?: Privileges
    basePrivileges?: Privileges
    callback: (code: string) => void
}
