import { lazy, Suspense, type JSX } from 'react'

import type { AdminGuardProps } from './AdminGuard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminGuard = lazy(async () => await import('./AdminGuard'))

const AdminGuard = (props: JSX.IntrinsicAttributes & AdminGuardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminGuard {...props} />
    </Suspense>
)

export default AdminGuard
