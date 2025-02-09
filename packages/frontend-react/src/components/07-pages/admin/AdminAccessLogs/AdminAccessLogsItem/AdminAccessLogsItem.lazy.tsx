import { lazy, Suspense, type JSX } from 'react'

import type { AdminAccessLogsItemProps } from './AdminAccessLogsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminAccessLogsItem = lazy(async () => await import('./AdminAccessLogsItem'))

const AdminAccessLogsItem = (props: JSX.IntrinsicAttributes & AdminAccessLogsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminAccessLogsItem {...props} />
    </Suspense>
)

export default AdminAccessLogsItem
