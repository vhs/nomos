import type { FC } from 'react'

import type { UserMenuProps } from './Menu.types'

import MenuItem from '@/components/05-materials/Menu/MenuItem/MenuItem'

import useAuth from '@/lib/hooks/useAuth'

const Menu: FC<UserMenuProps> = ({ className, menuItems }) => {
    const { currentUser } = useAuth()

    return (
        <div className={className} data-testid='Menu'>
            {menuItems.map((item) => {
                const { path, icon, name, condition } = item

                if (condition != null && !condition(currentUser)) return null

                return <MenuItem key={path} path={path} icon={icon} name={name} />
            })}
        </div>
    )
}

export default Menu
