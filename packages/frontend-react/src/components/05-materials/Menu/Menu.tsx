import type { FC } from 'react'

import { clsx } from 'clsx'

import type { MenuProps } from './Menu.types'

import MenuItem from '@/components/05-materials/Menu/MenuItem/MenuItem'

import useAuth from '@/lib/hooks/useAuth'

const Menu: FC<MenuProps> = ({ admin, className, menuItems }) => {
    admin ??= false

    const { currentUser } = useAuth()

    return (
        <div className={clsx([className, admin ? 'admin' : null])} data-testid='Menu'>
            {menuItems.map((item) => {
                const { id, path, icon, name, condition } = item

                if (condition != null && !condition(currentUser)) return null

                return <MenuItem key={path} path={path} icon={icon} name={name} id={id} />
            })}
        </div>
    )
}

export default Menu
