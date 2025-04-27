import { lazy, Suspense, type JSX } from 'react'

import type { LoginProps } from './Login.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LoginLazy = lazy(async () => await import('./Login'))

const Login = (props: JSX.IntrinsicAttributes & LoginProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LoginLazy {...props} />
    </Suspense>
)

export default Login
