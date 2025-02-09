import { lazy, Suspense, type JSX } from 'react'

import type { AdminDatabaseBackupProps } from './AdminDatabaseBackup.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminDatabaseBackup = lazy(async () => await import('./AdminDatabaseBackup'))

const AdminDatabaseBackup = (props: JSX.IntrinsicAttributes & AdminDatabaseBackupProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminDatabaseBackup {...props} />
    </Suspense>
)

export default AdminDatabaseBackup
