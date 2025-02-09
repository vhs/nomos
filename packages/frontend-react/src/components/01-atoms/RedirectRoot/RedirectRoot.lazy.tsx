import { lazy, Suspense, type JSX } from 'react'

import type { RedirectRootProps } from './RedirectRoot.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyRedirectRoot = lazy(async () => await import('./RedirectRoot'))

const RedirectRoot = (props: JSX.IntrinsicAttributes & RedirectRootProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRedirectRoot {...props} />
    </Suspense>
)

export default RedirectRoot
