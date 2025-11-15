import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import type { MainLayoutProps } from './MainLayout.types'

import Container from '@/components/01-atoms/Container/Container'

const MainLayout: FC<MainLayoutProps> = () => {
    return (
        <Container fluid>
            <Outlet />
        </Container>
    )
}

export default MainLayout
