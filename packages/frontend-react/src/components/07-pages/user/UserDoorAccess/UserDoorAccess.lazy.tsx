import { lazy, Suspense, type JSX } from 'react'

import type { UserDoorAccessProps } from './UserDoorAccess.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserDoorAccess = lazy(async () => await import('./UserDoorAccess'))

const UserDoorAccess = (props: JSX.IntrinsicAttributes & UserDoorAccessProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserDoorAccess {...props} />
    </Suspense>
)

export default UserDoorAccess
