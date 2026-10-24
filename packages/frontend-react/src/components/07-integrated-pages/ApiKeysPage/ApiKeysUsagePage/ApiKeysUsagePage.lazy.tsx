import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysUsagePageProps } from './ApiKeysUsagePage.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApiKeysUsagePage = lazy(async () => await import('./ApiKeysUsagePage'))

const ApiKeysUsagePage = (props: JSX.IntrinsicAttributes & ApiKeysUsagePageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysUsagePage {...props} />
    </Suspense>
)

export default ApiKeysUsagePage
