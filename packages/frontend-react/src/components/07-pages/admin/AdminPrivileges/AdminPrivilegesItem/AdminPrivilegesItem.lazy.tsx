import { lazy, Suspense, type JSX } from 'react'

import type { AdminPrivilegesItemProps } from './AdminPrivilegesItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminPrivilegesItemLazy = lazy(async () => await import('./AdminPrivilegesItem'))

const AdminPrivilegesItem = (props: JSX.IntrinsicAttributes & AdminPrivilegesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminPrivilegesItemLazy {...props} />
    </Suspense>
)

export default AdminPrivilegesItem
