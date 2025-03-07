import { lazy, Suspense, type JSX } from 'react'

import type { AdminUsersItemProps } from './AdminUsersItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminUsersItem = lazy(async () => await import('./AdminUsersItem'))

const AdminUsersItem = (props: JSX.IntrinsicAttributes & AdminUsersItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminUsersItem {...props} />
    </Suspense>
)

export default AdminUsersItem
