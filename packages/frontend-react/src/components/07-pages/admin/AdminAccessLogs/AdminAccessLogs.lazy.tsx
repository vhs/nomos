import { lazy, Suspense, type JSX } from 'react'

import type { AdminAccessLogsProps } from './AdminAccessLogs.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminAccessLogs = lazy(async () => await import('./AdminAccessLogs'))

const AdminAccessLogs = (props: JSX.IntrinsicAttributes & AdminAccessLogsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminAccessLogs {...props} />
    </Suspense>
)

export default AdminAccessLogs
