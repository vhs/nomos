import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'
import clsx from 'clsx'

import type { AuthenticatedLayoutProps } from './AuthenticatedLayout.types'

import Container from '@/components/01-atoms/Container/Container'
import Menu from '@/components/03-particles/Menu/Menu'
import MobileMenu from '@/components/04-composites/MobileMenu/MobileMenu'

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ admin, guardComponent: GuardComponent, menuItems }) => {
    admin ??= false

    return (
        <div data-testid='AuthenticatedLayout'>
            <GuardComponent>
                <Container fluid>
                    <div className='flex flex-row flex-nowrap'>
                        <div className='dynamic-menu'>
                            <Menu admin={admin} className={clsx(['nav', 'sidemenu'])} menuItems={menuItems} />
                        </div>
                        <div className='dynamic-content'>
                            <div className='max-w-full'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </Container>
                <MobileMenu menuItems={menuItems} />
            </GuardComponent>
        </div>
    )
}

export default AuthenticatedLayout
