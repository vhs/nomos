import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysNewModalProps } from './ApiKeysNewModal.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeysNewModal = lazy(async () => await import('./ApiKeysNewModal'))

const ApiKeysNewModal = (props: JSX.IntrinsicAttributes & ApiKeysNewModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysNewModal {...props} />
    </Suspense>
)

export default ApiKeysNewModal
