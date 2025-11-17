import type { ReactNode } from 'react'

import type { Privileges, User } from '@/types/validators/records'

export interface GrantingItemProps {
    children?: ReactNode
    grantablePrivileges: Privileges
    user: User
}
