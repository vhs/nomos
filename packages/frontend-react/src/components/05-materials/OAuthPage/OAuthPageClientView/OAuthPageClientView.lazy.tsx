import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageClientViewProps } from './OAuthPageClientView.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageClientView = lazy(async () => await import('./OAuthPageClientView'))

const OAuthPageClientView = (props: JSX.IntrinsicAttributes & OAuthPageClientViewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageClientView {...props} />
    </Suspense>
)

export default OAuthPageClientView
