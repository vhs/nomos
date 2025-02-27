import type { CastReactElement } from './utils'

import type { FontAwesomeIconProps, IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

import type PrincipalUserObject from '@/lib/db/PrincipalUser'

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
