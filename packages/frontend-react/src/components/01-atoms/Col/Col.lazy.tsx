import { lazy, Suspense, type JSX } from 'react'

import type { ColProps } from './Col.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyCol = lazy(async () => await import('./Col'))

const Col = (props: JSX.IntrinsicAttributes & ColProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCol {...props} />
    </Suspense>
)

export default Col
