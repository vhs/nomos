import { lazy, Suspense, type JSX } from 'react'

import type { OverlayProps } from './Overlay.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOverlay = lazy(async () => await import('./Overlay'))

const Overlay = (props: JSX.IntrinsicAttributes & OverlayProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOverlay {...props} />
    </Suspense>
)

export default Overlay
