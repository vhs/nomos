import { lazy, Suspense, type JSX } from 'react'

import type { DoorAccessProps } from './DoorAccess.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const DoorAccessLazy = lazy(async () => await import('./DoorAccess'))

const DoorAccess = (props: JSX.IntrinsicAttributes & DoorAccessProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <DoorAccessLazy {...props} />
    </Suspense>
)

export default DoorAccess
