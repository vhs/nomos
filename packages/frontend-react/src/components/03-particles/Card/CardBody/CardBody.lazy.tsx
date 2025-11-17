import { lazy, Suspense, type JSX } from 'react'

import type { CardBodyProps } from './CardBody.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyCardBody = lazy(async () => await import('./CardBody'))

const CardBody = (props: JSX.IntrinsicAttributes & CardBodyProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCardBody {...props} />
    </Suspense>
)

export default CardBody
