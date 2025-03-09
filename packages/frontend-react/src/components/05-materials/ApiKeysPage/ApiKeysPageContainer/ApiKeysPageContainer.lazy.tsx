import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysPageContainerProps } from './ApiKeysPageContainer.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeysPageContainer = lazy(async () => await import('./ApiKeysPageContainer'))

const ApiKeysPageContainer = (props: JSX.IntrinsicAttributes & ApiKeysPageContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysPageContainer {...props} />
    </Suspense>
)

export default ApiKeysPageContainer
