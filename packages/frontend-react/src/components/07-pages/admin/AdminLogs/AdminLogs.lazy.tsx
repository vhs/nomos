import { lazy, Suspense, type JSX } from 'react'

import type { AdminLogsProps } from './AdminLogs.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminLogsLazy = lazy(async () => await import('./AdminLogs'))

const AdminLogs = (props: JSX.IntrinsicAttributes & AdminLogsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminLogsLazy {...props} />
    </Suspense>
)

export default AdminLogs
