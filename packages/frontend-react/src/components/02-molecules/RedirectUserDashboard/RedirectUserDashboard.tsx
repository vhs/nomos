import type { FC } from 'react'

import { Navigate } from '@tanstack/react-router'

import type { RedirectUserDashboardProps } from './RedirectUserDashboard.types'

const RedirectUserDashboard: FC<RedirectUserDashboardProps> = () => <Navigate to='/' />

export default RedirectUserDashboard
