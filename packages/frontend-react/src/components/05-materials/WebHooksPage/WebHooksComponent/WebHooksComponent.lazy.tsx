import { lazy, Suspense, type JSX } from 'react'

import type { WebHooksComponentProps } from './WebHooksComponent.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyWebHooksComponent = lazy(async () => await import('./WebHooksComponent'))

const WebHooksComponent = (props: JSX.IntrinsicAttributes & WebHooksComponentProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyWebHooksComponent {...props} />
    </Suspense>
)

export default WebHooksComponent
