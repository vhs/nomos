import { lazy, Suspense, type JSX } from 'react'

import type { AdminStripeRecordsItemProps } from './AdminStripeRecordsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminStripeRecordsItemLazy = lazy(async () => await import('./AdminStripeRecordsItem'))

const AdminStripeRecordsItem = (props: JSX.IntrinsicAttributes & AdminStripeRecordsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminStripeRecordsItemLazy {...props} />
    </Suspense>
)

export default AdminStripeRecordsItem
