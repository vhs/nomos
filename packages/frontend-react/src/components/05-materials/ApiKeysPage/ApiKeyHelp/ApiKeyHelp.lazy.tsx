import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeyHelpProps } from './ApiKeyHelp.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeyHelp = lazy(async () => await import('./ApiKeyHelp'))

const ApiKeyHelp = (props: JSX.IntrinsicAttributes & ApiKeyHelpProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeyHelp {...props} />
    </Suspense>
)

export default ApiKeyHelp
