import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageDefaultViewProps } from './OAuthPageDefaultView.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageDefaultView = lazy(async () => await import('./OAuthPageDefaultView'))

const OAuthPageDefaultView = (props: JSX.IntrinsicAttributes & OAuthPageDefaultViewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageDefaultView {...props} />
    </Suspense>
)

export default OAuthPageDefaultView
