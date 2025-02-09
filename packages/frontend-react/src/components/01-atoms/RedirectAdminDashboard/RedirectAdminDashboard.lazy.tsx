import { lazy, Suspense, type JSX } from 'react'

import type { RedirectAdminDashboardProps } from './RedirectAdminDashboard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyRedirectAdminDashboard = lazy(async () => await import('./RedirectAdminDashboard'))

const RedirectAdminDashboard = (props: JSX.IntrinsicAttributes & RedirectAdminDashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRedirectAdminDashboard {...props} />
    </Suspense>
)

export default RedirectAdminDashboard
