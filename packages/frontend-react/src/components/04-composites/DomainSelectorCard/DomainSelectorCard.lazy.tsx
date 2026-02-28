import { lazy, Suspense, type JSX } from 'react'

import type { DomainSelectorCardProps } from './DomainSelectorCard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyDomainSelectorCard = lazy(async () => await import('./DomainSelectorCard'))

const DomainSelectorCard = (props: JSX.IntrinsicAttributes & DomainSelectorCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyDomainSelectorCard {...props} />
    </Suspense>
)

export default DomainSelectorCard
