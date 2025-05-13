import { lazy, Suspense, type JSX } from 'react'

import type { WebHooksPageProps } from './WebHooksPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyWebHooksPage = lazy(async () => await import('./WebHooksPage'))

const WebHooksPage = (props: JSX.IntrinsicAttributes & WebHooksPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyWebHooksPage {...props} />
    </Suspense>
)

export default WebHooksPage
