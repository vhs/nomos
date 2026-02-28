import type { FC } from 'react'

import type { AdminLayoutProps } from './AdminLayout.types'

import AdminGuard from '@/components/02-molecules/AdminGuard/AdminGuard'
import AuthenticatedLayout from '@/components/06-layouts/AuthenticatedLayout/AuthenticatedLayout'

import { AdminMenuItems } from './AdminLayout.ui'

const AdminLayout: FC<AdminLayoutProps> = () => {
    return <AuthenticatedLayout guardComponent={AdminGuard} admin menuItems={AdminMenuItems} />
}

export default AdminLayout
