import { lazy, Suspense, type JSX } from 'react'

import type { AdminMembershipsItemProps } from './AdminMembershipsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminMembershipsItem = lazy(async () => await import('./AdminMembershipsItem'))

const AdminMembershipsItem = (props: JSX.IntrinsicAttributes & AdminMembershipsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminMembershipsItem {...props} />
    </Suspense>
)

export default AdminMembershipsItem
