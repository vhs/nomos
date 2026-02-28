import { lazy, Suspense, type JSX } from 'react'

import type { WebHooksProps } from './WebHooks.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const WebHooksLazy = lazy(async () => await import('./WebHooks'))

const WebHooks = (props: JSX.IntrinsicAttributes & WebHooksProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <WebHooksLazy {...props} />
    </Suspense>
)

export default WebHooks
