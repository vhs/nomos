import { lazy, Suspense, type JSX } from 'react'

import type { RowProps } from './Row.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyRow = lazy(async () => await import('./Row'))

const Row = (props: JSX.IntrinsicAttributes & RowProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRow {...props} />
    </Suspense>
)

export default Row
