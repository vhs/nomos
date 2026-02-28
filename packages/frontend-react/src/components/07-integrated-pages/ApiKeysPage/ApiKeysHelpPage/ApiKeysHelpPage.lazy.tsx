import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysHelpPageProps } from './ApiKeysHelpPage.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApiKeysHelp = lazy(async () => await import('./ApiKeysHelpPage'))

const ApiKeysHelpPage = (props: JSX.IntrinsicAttributes & ApiKeysHelpPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysHelp {...props} />
    </Suspense>
)

export default ApiKeysHelpPage
