import { lazy, Suspense, type JSX } from 'react'

import type { AdminUsersNewProps } from './AdminUsersNew.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminUsersNew = lazy(async () => await import('./AdminUsersNew'))

const AdminUsersNew = (props: JSX.IntrinsicAttributes & AdminUsersNewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminUsersNew {...props} />
    </Suspense>
)

export default AdminUsersNew
