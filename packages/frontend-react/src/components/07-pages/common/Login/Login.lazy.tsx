import { lazy, Suspense, type JSX } from 'react'

import type { LoginProps } from './Login.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyLogin = lazy(async () => await import('./Login'))

const Login = (props: JSX.IntrinsicAttributes & LoginProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyLogin {...props} />
    </Suspense>
)

export default Login
