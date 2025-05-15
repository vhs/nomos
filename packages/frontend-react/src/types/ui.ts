import type { Dispatch, SetStateAction } from 'react'

import type { CastReactElement } from './utils'
import type { BooleanRecord } from './validators/common'

import type { FontAwesomeIconProps, IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

import type PrincipalUserObject from '@/lib/db/models/PrincipalUser'

export interface MenuItem {
    path: string
    icon: IconProp | FontAwesomeIconProps
    name: string
    condition?: (currentUser: PrincipalUserObject | null | undefined) => boolean
    itemClassName?: string
}

export type MenuItems = MenuItem[]

export interface SideMenuProps extends CastReactElement<'div'> {
    admin?: boolean
    menuItems: MenuItems
}

export type ReactAction<T> = Dispatch<SetStateAction<T>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TablePageItemComponent<T = any> {
    fields: BooleanRecord
    data: T
}
