import type { FontAwesomeIconProps, IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

import type PrincipalUserObject from '@/lib/db/PrincipalUser'

export interface MenuItem {
    path: string
    icon: IconProp | FontAwesomeIconProps
    name: string
    condition?: (currentUser: PrincipalUserObject | null | undefined) => boolean
    id?: string
}

export type MenuItems = MenuItem[]

export interface SideMenuProps {
    admin?: boolean
    className?: string
    menuItems: MenuItems
}
