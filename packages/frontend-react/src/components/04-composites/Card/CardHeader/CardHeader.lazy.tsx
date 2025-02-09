import { lazy, Suspense, type JSX } from 'react'

import type { CardHeaderProps } from './CardHeader.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCardHeader = lazy(async () => await import('./CardHeader'))

const CardHeader = (props: JSX.IntrinsicAttributes & CardHeaderProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCardHeader {...props} />
    </Suspense>
)

export default CardHeader
