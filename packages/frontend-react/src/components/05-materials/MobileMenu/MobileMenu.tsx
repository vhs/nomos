import { useEffect, useState, type FC } from 'react'

import { useLocation } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { MobileMenuProps } from './MobileMenu.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Menu from '@/components/05-materials/Menu/Menu'

const MobileMenu: FC<MobileMenuProps> = ({ admin, menuItems }) => {
    admin ??= false

    const pathName = useLocation({ select: ({ pathname }) => pathname })

    const [menuLocation, setMenuLocation] = useState(pathName)

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = (): void => {
        setShowMenu((prevState) => !prevState)
    }

    useEffect(() => {
        if (pathName !== menuLocation) {
            setShowMenu(false)
            setMenuLocation(pathName)
        }
    }, [pathName, menuLocation])

    return (
        <div className='fixed bottom-4 right-2 block w-11 md:hidden' data-testid='MobileMenu'>
            <Button
                variant='light'
                className='border-2 border-black'
                onClick={() => {
                    toggleMenu()
                }}
            >
                <FontAwesomeIcon icon='bars' />
            </Button>
            <Menu
                className={clsx([
                    showMenu ? 'display' : 'hidden',
                    'fixed bottom-14 right-3 overflow-y-auto rounded-lg border border-black/50 bg-white p-2',
                    admin ? 'admin' : ''
                ])}
                menuItems={menuItems}
            />
        </div>
    )
}

export default MobileMenu
