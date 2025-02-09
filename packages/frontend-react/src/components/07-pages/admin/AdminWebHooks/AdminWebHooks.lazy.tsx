import { lazy, Suspense, type JSX } from 'react'

import type { AdminWebHooksProps } from './AdminWebHooks.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminWebHooks = lazy(async () => await import('./AdminWebHooks'))

const AdminWebHooks = (props: JSX.IntrinsicAttributes & AdminWebHooksProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminWebHooks {...props} />
    </Suspense>
)

export default AdminWebHooks
