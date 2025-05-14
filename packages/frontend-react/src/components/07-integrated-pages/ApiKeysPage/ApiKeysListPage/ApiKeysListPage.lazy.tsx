import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysListPageProps } from './ApiKeysListPage.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApiKeysListPage = lazy(async () => await import('./ApiKeysListPage'))

const ApiKeysListPage = (props: JSX.IntrinsicAttributes & ApiKeysListPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysListPage {...props} />
    </Suspense>
)

export default ApiKeysListPage
