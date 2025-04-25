import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageClientItemProps } from './OAuthPageClientItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageClientItem = lazy(async () => await import('./OAuthPageClientItem'))

const OAuthPageClientItem = (props: JSX.IntrinsicAttributes & OAuthPageClientItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageClientItem {...props} />
    </Suspense>
)

export default OAuthPageClientItem
