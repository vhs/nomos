import { lazy, Suspense, type JSX } from 'react'

import type { RedirectUserDashboardProps } from './RedirectUserDashboard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyRedirectUserDashboard = lazy(async () => await import('./RedirectUserDashboard'))

const RedirectUserDashboard = (props: JSX.IntrinsicAttributes & RedirectUserDashboardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRedirectUserDashboard {...props} />
    </Suspense>
)

export default RedirectUserDashboard
