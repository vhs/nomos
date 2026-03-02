import type { FC, ReactNode } from 'react'

import type { MenuItems } from '@/types/ui'
import type { CastReactElement } from '@/types/utils'

export interface AuthenticatedLayoutProps extends CastReactElement<'div'> {
    children?: ReactNode
    admin?: boolean
    guardComponent: FC<{ children: ReactNode }>
    menuItems: MenuItems
}
