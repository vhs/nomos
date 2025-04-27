import { lazy, Suspense, type JSX } from 'react'

import type { AdminIPNRecordsProps } from './AdminIPNRecords.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminIPNRecordsLazy = lazy(async () => await import('./AdminIPNRecords'))

const AdminIPNRecords = (props: JSX.IntrinsicAttributes & AdminIPNRecordsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminIPNRecordsLazy {...props} />
    </Suspense>
)

export default AdminIPNRecords
