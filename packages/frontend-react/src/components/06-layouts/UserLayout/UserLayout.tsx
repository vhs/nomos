import type { FC } from 'react'

import type { UserLayoutProps } from './UserLayout.types'

import UserGuard from '@/components/02-molecules/UserGuard/UserGuard'
import AuthenticatedLayout from '@/components/06-layouts/AuthenticatedLayout/AuthenticatedLayout'

import { UserMenuItems } from './UserLayout.ui'

const UserLayout: FC<UserLayoutProps> = () => (
    <AuthenticatedLayout guardComponent={UserGuard} menuItems={UserMenuItems} />
)

export default UserLayout
