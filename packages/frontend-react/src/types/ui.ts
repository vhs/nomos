import type { IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

import type PrincipalUserObject from '@/lib/db/PrincipalUser'

export interface MenuItem {
    path: string
    icon: IconProp
    name: string
    condition?: (currentUser: PrincipalUserObject | null | undefined) => boolean
}

export type MenuItems = MenuItem[]

export interface SideMenuProps {
    admin?: boolean
    className?: string
    menuItems: MenuItems
}
