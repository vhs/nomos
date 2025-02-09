import { lazy, Suspense, type JSX } from 'react'

import type { PathTabProps } from './PathTab.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyTab = lazy(async () => await import('./PathTab'))

const PathTab = (props: JSX.IntrinsicAttributes & PathTabProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTab {...props} />
    </Suspense>
)

export default PathTab
