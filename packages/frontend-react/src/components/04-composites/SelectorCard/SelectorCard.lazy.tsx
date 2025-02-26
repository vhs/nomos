import { lazy, Suspense, type JSX } from 'react'

import type { SelectorCardProps } from './SelectorCard.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazySelectorCard = lazy(async () => await import('./SelectorCard'))

const SelectorCard = (props: JSX.IntrinsicAttributes & SelectorCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazySelectorCard {...props} />
    </Suspense>
)

export default SelectorCard
