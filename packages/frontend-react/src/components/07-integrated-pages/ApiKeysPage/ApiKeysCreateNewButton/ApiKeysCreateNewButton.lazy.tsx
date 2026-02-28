import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysCreateNewButtonProps } from './ApiKeysCreateNewButton.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApiKeysCreateNewButton = lazy(async () => await import('./ApiKeysCreateNewButton'))

const ApiKeysCreateNewButton = (props: JSX.IntrinsicAttributes & ApiKeysCreateNewButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysCreateNewButton {...props} />
    </Suspense>
)

export default ApiKeysCreateNewButton
