import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import type { UserLayoutProps } from './UserLayout.types'

import Col from '@/components/01-atoms/Col/Col'
import Container from '@/components/01-atoms/Container/Container'
import Row from '@/components/01-atoms/Row/Row'
import UserGuard from '@/components/02-molecules/UserGuard/UserGuard'
import Menu from '@/components/05-materials/Menu/Menu'
import MobileMenu from '@/components/05-materials/MobileMenu/MobileMenu'

import { UserMenuItems } from './UserLayout.ui'

const UserLayout: FC<UserLayoutProps> = () => (
    <UserGuard>
        <Container fluid>
            <Row className='main-layout-row'>
                <Col className='basis-dynamic-menu'>
                    <Menu className='nav' menuItems={UserMenuItems} />
                </Col>
                <Col className='basis-dynamic-content'>
                    <Outlet />
                </Col>
            </Row>
            <MobileMenu menuItems={UserMenuItems} />
        </Container>
    </UserGuard>
)

export default UserLayout
