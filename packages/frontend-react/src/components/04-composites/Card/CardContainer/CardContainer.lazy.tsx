import { lazy, Suspense, type JSX } from 'react'

import type { CardContainerProps } from './CardContainer.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCardContainer = lazy(async () => await import('./CardContainer'))

const CardContainer = (props: JSX.IntrinsicAttributes & CardContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCardContainer {...props} />
    </Suspense>
)

export default CardContainer
