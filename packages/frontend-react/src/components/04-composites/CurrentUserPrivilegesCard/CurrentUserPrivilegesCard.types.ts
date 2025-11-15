import type { ReactNode } from 'react'

import type UserObject from '@/lib/db/models/User'

import type { CombinedPrivileges } from '@/types/common'
import type { CastReactElement } from '@/types/utils'

export interface CurrentUserPrivilegesCardProps extends CastReactElement<'div'> {
    children?: ReactNode
    currentUser: UserObject
}
export interface CurrentUserPrivilegesListProps extends CastReactElement<'div'> {
    privileges: CombinedPrivileges
}
