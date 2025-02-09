import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeyProps } from './ApiKey.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKey = lazy(async () => await import('./ApiKey'))

const ApiKey = (props: JSX.IntrinsicAttributes & ApiKeyProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKey {...props} />
    </Suspense>
)

export default ApiKey
