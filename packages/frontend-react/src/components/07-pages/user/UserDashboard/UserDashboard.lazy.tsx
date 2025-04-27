import { lazy, Suspense, type JSX } from 'react'

import type { UserDashboardProps } from './UserDashboard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserDashboardLazy = lazy(async () => await import('./UserDashboard'))

const UserDashboard = (props: JSX.IntrinsicAttributes & UserDashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserDashboardLazy {...props} />
    </Suspense>
)

export default UserDashboard
