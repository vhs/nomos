import { lazy, Suspense, type JSX } from 'react'

import type { AdminUsersProps } from './AdminUsers.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminUsersLazy = lazy(async () => await import('./AdminUsers'))

const AdminUsers = (props: JSX.IntrinsicAttributes & AdminUsersProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminUsersLazy {...props} />
    </Suspense>
)

export default AdminUsers
