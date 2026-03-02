import type { FC } from 'react'

import { Navigate, useLocation } from '@tanstack/react-router'

import type { AdminGuardProps } from './AdminGuard.types'

import useAuth from '@/lib/hooks/useAuth'

const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
    const { isAuthenticated, currentUser } = useAuth()

    const pathname = useLocation({
        select: (location) => location.pathname
    })

    if (!isAuthenticated) return <Navigate to='/login' search={{ redirectUri: pathname }} replace />

    if (!(currentUser?.hasPermission('administrator') ?? false)) return <Navigate to='/' replace />

    return <>{children}</>
}

export default AdminGuard
