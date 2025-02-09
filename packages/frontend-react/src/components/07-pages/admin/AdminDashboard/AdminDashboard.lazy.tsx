import { Suspense, lazy, type JSX } from 'react'

import type { AdminDashboardProps } from './AdminDashboard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminDashboard = lazy(async () => await import('./AdminDashboard'))

const AdminDashboard = (props: JSX.IntrinsicAttributes & AdminDashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminDashboard {...props} />
    </Suspense>
)

export default AdminDashboard
