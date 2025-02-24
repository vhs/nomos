import { lazy, Suspense, type JSX } from 'react'

import type { UserGuardProps } from './UserGuard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserGuard = lazy(async () => await import('./UserGuard'))

const UserGuard = (props: JSX.IntrinsicAttributes & UserGuardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserGuard {...props} />
    </Suspense>
)

export default UserGuard
