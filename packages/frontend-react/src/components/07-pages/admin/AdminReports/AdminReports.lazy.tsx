import { lazy, Suspense, type JSX } from 'react'

import type { AdminReportsProps } from './AdminReports.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminReports = lazy(async () => await import('./AdminReports'))

const AdminReports = (props: JSX.IntrinsicAttributes & AdminReportsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminReports {...props} />
    </Suspense>
)

export default AdminReports
