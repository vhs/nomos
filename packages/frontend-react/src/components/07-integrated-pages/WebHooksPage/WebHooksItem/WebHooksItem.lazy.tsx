import { lazy, Suspense, type JSX } from 'react'

import type { WebHooksItemProps } from './WebHooksItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyWebHooksItem = lazy(async () => await import('./WebHooksItem'))

const WebHooksItem = (props: JSX.IntrinsicAttributes & WebHooksItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyWebHooksItem {...props} />
    </Suspense>
)

export default WebHooksItem
