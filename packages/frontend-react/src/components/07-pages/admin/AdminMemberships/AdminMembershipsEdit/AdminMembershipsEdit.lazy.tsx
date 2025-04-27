import { lazy, Suspense, type JSX } from 'react'

import type { AdminMembershipsEditProps } from './AdminMembershipsEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminMembershipsEditLazy = lazy(async () => await import('./AdminMembershipsEdit'))

const AdminMembershipsEdit = (props: JSX.IntrinsicAttributes & AdminMembershipsEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminMembershipsEditLazy {...props} />
    </Suspense>
)

export default AdminMembershipsEdit
