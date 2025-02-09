import { lazy, Suspense, type JSX } from 'react'

import type { AdminMembershipsEditProps } from './AdminMembershipsEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminMembershipsEdit = lazy(async () => await import('./AdminMembershipsEdit'))

const AdminMembershipsEdit = (props: JSX.IntrinsicAttributes & AdminMembershipsEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminMembershipsEdit {...props} />
    </Suspense>
)

export default AdminMembershipsEdit
