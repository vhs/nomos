import { lazy, Suspense, type JSX } from 'react'

import type { TabsProps } from './Tabs.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyTabs = lazy(async () => await import('./Tabs'))

const Tabs = (props: JSX.IntrinsicAttributes & TabsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTabs {...props} />
    </Suspense>
)

export default Tabs
