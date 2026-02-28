import type { FC } from 'react'

import { clsx } from 'clsx'

import type { MenuProps } from './Menu.types'

import useAuth from '@/lib/hooks/useAuth'

import MenuItem from './MenuItem/MenuItem'

const Menu: FC<MenuProps> = ({ admin, className, menuItems }) => {
    admin ??= false

    const { currentUser } = useAuth()

    return (
        <div className={clsx([className, admin ? 'admin' : null])} data-testid='Menu'>
            {menuItems.map((item) => {
                const { itemClassName, path, icon, name, condition } = item

                if (condition != null && !condition(currentUser)) return null

                return <MenuItem key={path} path={path} icon={icon} name={name} itemClassName={itemClassName} />
            })}
        </div>
    )
}

export default Menu
