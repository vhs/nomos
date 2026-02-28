import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysEditModalProps } from './ApiKeysEditModal.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApiKeysEditModal = lazy(async () => await import('./ApiKeysEditModal'))

const ApiKeysEditModal = (props: JSX.IntrinsicAttributes & ApiKeysEditModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysEditModal {...props} />
    </Suspense>
)

export default ApiKeysEditModal
