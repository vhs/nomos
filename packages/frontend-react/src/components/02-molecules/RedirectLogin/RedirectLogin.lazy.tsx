import { lazy, Suspense, type JSX } from 'react'

import type { RedirectLoginProps } from './RedirectLogin.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyRedirectLogin = lazy(async () => await import('./RedirectLogin'))

const RedirectLogin = (props: JSX.IntrinsicAttributes & RedirectLoginProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyRedirectLogin {...props} />
    </Suspense>
)

export default RedirectLogin
