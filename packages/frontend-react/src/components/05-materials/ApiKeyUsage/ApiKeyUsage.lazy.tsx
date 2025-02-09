import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeyUsageProps } from './ApiKeyUsage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeyUsage = lazy(async () => await import('./ApiKeyUsage'))

const ApiKeyUsage = (props: JSX.IntrinsicAttributes & ApiKeyUsageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeyUsage {...props} />
    </Suspense>
)

export default ApiKeyUsage
