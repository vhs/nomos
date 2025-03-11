import type { ReactNode } from 'react'

import type { Privileges, User } from '@/types/validators/records'

export interface UserGrantingItemProps {
    children?: ReactNode
    availableGrants: Privileges
    user: User
}
