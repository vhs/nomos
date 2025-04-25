import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageProps } from './OAuthPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPage = lazy(async () => await import('./OAuthPage'))

const OAuthPage = (props: JSX.IntrinsicAttributes & OAuthPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPage {...props} />
    </Suspense>
)

export default OAuthPage
