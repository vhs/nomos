import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import type { AdminLayoutProps } from './AdminLayout.types'

import Col from '@/components/01-atoms/Col/Col'
import Container from '@/components/01-atoms/Container/Container'
import Row from '@/components/01-atoms/Row/Row'
import AdminGuard from '@/components/02-molecules/AdminGuard/AdminGuard'
import Menu from '@/components/05-materials/Menu/Menu'
import MobileMenu from '@/components/05-materials/MobileMenu/MobileMenu'

import { AdminMenuItems } from './AdminLayout.ui'

const AdminLayout: FC<AdminLayoutProps> = () => {
    return (
        <AdminGuard>
            <Container fluid>
                <Row className='main-layout-row'>
                    <Col className='basis-dynamic-menu'>
                        <Menu className='nav admin' menuItems={AdminMenuItems} />
                    </Col>
                    <Col className='basis-dynamic-content'>
                        <Outlet />
                    </Col>
                </Row>
                <MobileMenu admin menuItems={AdminMenuItems} />
            </Container>
        </AdminGuard>
    )
}

export default AdminLayout
