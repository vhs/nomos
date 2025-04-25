import { lazy, Suspense, type JSX } from 'react'

import type { AdminPrivilegesEditProps } from './AdminPrivilegesEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminPrivilegesEdit = lazy(async () => await import('./AdminPrivilegesEdit'))

const AdminPrivilegesEdit = (props: JSX.IntrinsicAttributes & AdminPrivilegesEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminPrivilegesEdit {...props} />
    </Suspense>
)

export default AdminPrivilegesEdit
