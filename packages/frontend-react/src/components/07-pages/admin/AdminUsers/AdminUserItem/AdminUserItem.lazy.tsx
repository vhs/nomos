import { lazy, Suspense, type JSX } from 'react'

import type { AdminUserItemProps } from './AdminUserItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminUserItem = lazy(async () => await import('./AdminUserItem'))

const AdminUserItem = (props: JSX.IntrinsicAttributes & AdminUserItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminUserItem {...props} />
    </Suspense>
)

export default AdminUserItem
