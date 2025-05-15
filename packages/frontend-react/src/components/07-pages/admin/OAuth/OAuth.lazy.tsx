import { lazy, Suspense, type JSX } from 'react'

import type { OAuthProps } from './OAuth.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const OAuthLazy = lazy(async () => await import('./OAuth'))

const OAuth = (props: JSX.IntrinsicAttributes & OAuthProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <OAuthLazy {...props} />
    </Suspense>
)

export default OAuth
