import { type JSX, lazy, Suspense } from 'react'

import type { LoadingOverlayProps } from './LoadingOverlay.types'

const LazyLoadingOverlay = lazy(async () => await import('./LoadingOverlay'))

const LoadingOverlay = (props: JSX.IntrinsicAttributes & LoadingOverlayProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyLoadingOverlay {...props} />
    </Suspense>
)

export default LoadingOverlay
