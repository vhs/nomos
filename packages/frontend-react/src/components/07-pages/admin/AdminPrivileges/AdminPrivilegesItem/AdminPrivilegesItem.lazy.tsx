import { lazy, Suspense, type JSX } from 'react'

import type { AdminPrivilegesItemProps } from './AdminPrivilegesItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminPrivilegesItem = lazy(async () => await import('./AdminPrivilegesItem'))

const AdminPrivilegesItem = (props: JSX.IntrinsicAttributes & AdminPrivilegesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminPrivilegesItem {...props} />
    </Suspense>
)

export default AdminPrivilegesItem
