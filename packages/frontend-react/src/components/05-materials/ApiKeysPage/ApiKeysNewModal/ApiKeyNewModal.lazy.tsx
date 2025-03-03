import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysNewModalProps } from './ApiKeyNewModal.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeyNewModal = lazy(async () => await import('./ApiKeyNewModal'))

const ApiKeyNewModal = (props: JSX.IntrinsicAttributes & ApiKeysNewModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeyNewModal {...props} />
    </Suspense>
)

export default ApiKeyNewModal
