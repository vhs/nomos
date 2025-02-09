import { lazy, Suspense, type JSX } from 'react'

import type { AdminOAuthProps } from './AdminOAuth.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminOAuth = lazy(async () => await import('./AdminOAuth'))

const AdminOAuth = (props: JSX.IntrinsicAttributes & AdminOAuthProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminOAuth {...props} />
    </Suspense>
)

export default AdminOAuth
