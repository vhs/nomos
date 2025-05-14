import { lazy, Suspense, type JSX } from 'react'

import type { AuthenticatedLayoutProps } from './AuthenticatedLayout.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyAuthenticatedLayout = lazy(async () => await import('./AuthenticatedLayout'))

const AuthenticatedLayout = (props: JSX.IntrinsicAttributes & AuthenticatedLayoutProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAuthenticatedLayout {...props} />
    </Suspense>
)

export default AuthenticatedLayout
