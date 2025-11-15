import { lazy, Suspense, type JSX } from 'react'

import type { NotFoundComponentProps } from './NotFoundComponent.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyNotFoundComponent = lazy(async () => await import('./NotFoundComponent'))

const NotFoundComponent = (props: JSX.IntrinsicAttributes & NotFoundComponentProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyNotFoundComponent {...props} />
    </Suspense>
)

export default NotFoundComponent
