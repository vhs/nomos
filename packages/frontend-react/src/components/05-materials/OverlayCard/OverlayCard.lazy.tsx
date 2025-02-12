import { lazy, Suspense, type JSX } from 'react'

import type { OverlayCardProps } from './OverlayCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOverlayCard = lazy(async () => await import('./OverlayCard'))

const OverlayCard = (props: JSX.IntrinsicAttributes & OverlayCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOverlayCard {...props} />
    </Suspense>
)

export default OverlayCard
