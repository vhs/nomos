import { lazy, Suspense, type JSX } from 'react'

import type { RootComponentProps } from './RootComponent.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyRootComponent = lazy(async () => await import('./RootComponent'))

const RootComponent = (props: JSX.IntrinsicAttributes & RootComponentProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRootComponent {...props} />
    </Suspense>
)

export default RootComponent
