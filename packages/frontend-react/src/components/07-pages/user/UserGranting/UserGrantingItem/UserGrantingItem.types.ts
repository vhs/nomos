import type { ReactNode } from 'react'

import type { Privileges, User, Users } from '@/types/validators/records'
import { KeyedMutator } from 'swr'

export interface UserGrantingItemProps {
    children?: ReactNode
    availableGrants: Privileges
    mutateListUsers: KeyedMutator<Users>
    user: User
}
