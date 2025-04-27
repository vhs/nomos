import { lazy, Suspense, type JSX } from 'react'

import type { AdminIPNRecordsItemProps } from './AdminIPNRecordsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminIPNRecordsItemLazy = lazy(async () => await import('./AdminIPNRecordsItem'))

const AdminIPNRecordsItem = (props: JSX.IntrinsicAttributes & AdminIPNRecordsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminIPNRecordsItemLazy {...props} />
    </Suspense>
)

export default AdminIPNRecordsItem
