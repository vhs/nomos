import type { FC } from 'react'

import type { NavBarProps } from './NavBar.types'

const NavBar: FC<NavBarProps> = ({ children }) => (
    <div
        className='nav fixed left-0 right-0 top-0 z-above-and-beyond mb-2 h-12 border-b shadow-md'
        data-testid='NavBar'
    >
        {children}
    </div>
)

export default NavBar
