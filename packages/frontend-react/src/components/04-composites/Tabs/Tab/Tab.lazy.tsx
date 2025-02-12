import { lazy, Suspense, type JSX } from 'react'

import type { TabProps } from './Tab.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyTab = lazy(async () => await import('./Tab'))

const Tab = (props: JSX.IntrinsicAttributes & TabProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTab {...props} />
    </Suspense>
)

export default Tab
