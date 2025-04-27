import { lazy, Suspense, type JSX } from 'react'

import type { AdminMembershipsProps } from './AdminMemberships.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminMembershipsLazy = lazy(async () => await import('./AdminMemberships'))

const AdminMemberships = (props: JSX.IntrinsicAttributes & AdminMembershipsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminMembershipsLazy {...props} />
    </Suspense>
)

export default AdminMemberships
