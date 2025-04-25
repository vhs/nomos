import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageContainerProps } from './OAuthPageContainer.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageContainer = lazy(async () => await import('./OAuthPageContainer'))

const OAuthPageContainer = (props: JSX.IntrinsicAttributes & OAuthPageContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageContainer {...props} />
    </Suspense>
)

export default OAuthPageContainer
