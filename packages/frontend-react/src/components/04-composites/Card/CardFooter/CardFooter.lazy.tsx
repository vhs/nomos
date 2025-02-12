import { lazy, Suspense, type JSX } from 'react'

import type { CardFooterProps } from './CardFooter.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCardFooter = lazy(async () => await import('./CardFooter'))

const CardFooter = (props: JSX.IntrinsicAttributes & CardFooterProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCardFooter {...props} />
    </Suspense>
)

export default CardFooter
