import type { FC } from 'react'

import { Navigate, useLocation } from '@tanstack/react-router'

import type { UserGuardProps } from './UserGuard.types'

import useAuth from '@/lib/hooks/useAuth'

const UserGuard: FC<UserGuardProps> = ({ children }) => {
    const { isAuthenticated } = useAuth()

    const pathname = useLocation({
        select: (location) => location.pathname
    })

    if (!isAuthenticated) {
        return <Navigate to='/login' search={{ redirectUri: pathname }} replace />
    }

    return <>{children}</>
}

export default UserGuard
