import type { FC } from 'react'

import { Navigate } from '@tanstack/react-router'

import type { RedirectAdminDashboardProps } from './RedirectAdminDashboard.types'

const RedirectAdminDashboard: FC<RedirectAdminDashboardProps> = () => <Navigate to='/admin' />

export default RedirectAdminDashboard
