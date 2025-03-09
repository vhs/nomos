import { lazy, Suspense, type JSX } from 'react'

import type { PillProps } from './Pill.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPill = lazy(async () => await import('./Pill'))

const Pill = (props: JSX.IntrinsicAttributes & PillProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPill {...props} />
    </Suspense>
)

export default Pill
