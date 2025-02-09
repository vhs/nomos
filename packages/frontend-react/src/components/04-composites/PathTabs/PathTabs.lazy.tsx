import { lazy, Suspense, type JSX } from 'react'

import type { PathTabsProps } from './PathTabs.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyPathTabs = lazy(async () => await import('./PathTabs'))

const PathTabs = (props: JSX.IntrinsicAttributes & PathTabsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPathTabs {...props} />
    </Suspense>
)

export default PathTabs
