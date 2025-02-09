import { lazy, Suspense, type JSX } from 'react'

import type { AdminUsersEditProps } from './AdminUsersEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminUsersEdit = lazy(async () => await import('./AdminUsersEdit'))

const AdminUsersEdit = (props: JSX.IntrinsicAttributes & AdminUsersEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminUsersEdit {...props} />
    </Suspense>
)

export default AdminUsersEdit
