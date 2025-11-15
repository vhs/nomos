import { lazy, Suspense, type JSX } from 'react'

import type { WaitingRoomProps } from './WaitingRoom.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyWaitingRoom = lazy(async () => await import('./WaitingRoom'))

const WaitingRoom = (props: JSX.IntrinsicAttributes & WaitingRoomProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyWaitingRoom {...props} />
    </Suspense>
)

export default WaitingRoom
