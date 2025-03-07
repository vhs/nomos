import type { ReactNode } from 'react'

import type UserObject from '@/lib/db/models/User'

import type { CombinedPrivileges } from '@/types/common'
import type { CastReactElement } from '@/types/utils'

export interface UserProfileProps {
    children?: ReactNode
}

export interface APIKeysProps {
    currentUser: UserObject
}

export interface APIKeysCardProps {
    children?: ReactNode
    currentUser: UserObject
}

export interface RFIDKeysProps {
    currentUser: UserObject
}

export interface RFIDKeysCardProps {
    children?: ReactNode
    currentUser: UserObject
}

export interface StandingCardProps {
    children?: ReactNode
    standing: boolean | undefined
}

export interface PrivilegesListProps extends CastReactElement<'div'> {
    privileges: CombinedPrivileges
}

export interface PrivilegesCardProps extends CastReactElement<'div'> {
    children?: ReactNode
    currentUser: UserObject
}
