import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysHelpPageProps } from './ApiKeysHelpPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeyHelp = lazy(async () => await import('./ApiKeysHelpPage'))

const ApiKeysHelpPage = (props: JSX.IntrinsicAttributes & ApiKeysHelpPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeyHelp {...props} />
    </Suspense>
)

export default ApiKeysHelpPage
