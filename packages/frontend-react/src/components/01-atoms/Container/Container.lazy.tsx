import { lazy, Suspense, type JSX } from 'react'

import type { ContainerProps } from './Container.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyContainer = lazy(async () => await import('./Container'))

const Container = (props: JSX.IntrinsicAttributes & ContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyContainer {...props} />
    </Suspense>
)

export default Container
