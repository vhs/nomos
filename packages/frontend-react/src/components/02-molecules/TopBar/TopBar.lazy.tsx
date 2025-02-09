import { type JSX, lazy, Suspense } from 'react'

import type { TopBarProps } from './TopBar.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyTopBar = lazy(async () => await import('./TopBar'))

const TopBar = (props: JSX.IntrinsicAttributes & TopBarProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTopBar {...props} />
    </Suspense>
)

export default TopBar
