import { lazy, Suspense, type JSX } from 'react'

import type { AdminPrivilegesProps } from './AdminPrivileges.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminPrivileges = lazy(async () => await import('./AdminPrivileges'))

const AdminPrivileges = (props: JSX.IntrinsicAttributes & AdminPrivilegesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminPrivileges {...props} />
    </Suspense>
)

export default AdminPrivileges
