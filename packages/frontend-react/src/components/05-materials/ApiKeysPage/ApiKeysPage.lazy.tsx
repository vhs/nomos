import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysPageProps } from './ApiKeysPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeysPage = lazy(async () => await import('./ApiKeysPage'))

const ApiKeysPage = (props: JSX.IntrinsicAttributes & ApiKeysPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysPage {...props} />
    </Suspense>
)

export default ApiKeysPage
