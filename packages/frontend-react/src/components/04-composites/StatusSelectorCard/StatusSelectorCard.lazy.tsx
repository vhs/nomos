import { lazy, Suspense, type JSX } from 'react'

import type { StatusSelectorCardProps } from './StatusSelectorCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyStatusSelectorCard = lazy(async () => await import('./StatusSelectorCard'))

const StatusSelectorCard = (props: JSX.IntrinsicAttributes & StatusSelectorCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyStatusSelectorCard {...props} />
    </Suspense>
)

export default StatusSelectorCard
