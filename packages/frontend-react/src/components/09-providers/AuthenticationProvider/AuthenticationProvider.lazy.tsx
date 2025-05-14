import { lazy, Suspense, type JSX } from 'react'

import type { AuthenticationProviderProps } from './AuthenticationProvider.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyAuthenticationProvider = lazy(async () => await import('./AuthenticationProvider'))

const AuthenticationProvider = (props: JSX.IntrinsicAttributes & AuthenticationProviderProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAuthenticationProvider {...props} />
    </Suspense>
)

export default AuthenticationProvider
