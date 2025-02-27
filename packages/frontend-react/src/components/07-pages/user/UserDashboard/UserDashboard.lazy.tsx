import { lazy, Suspense, type JSX } from 'react'

import type { UserDashboardProps } from './UserDashboard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserDashboard = lazy(async () => await import('./UserDashboard'))

const UserDashboard = (props: JSX.IntrinsicAttributes & UserDashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserDashboard {...props} />
    </Suspense>
)

export default UserDashboard
