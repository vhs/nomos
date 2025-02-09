import { lazy, Suspense, type JSX } from 'react'

import type { AdminStripeRecordsProps } from './AdminStripeRecords.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminStripeRecords = lazy(async () => await import('./AdminStripeRecords'))

const AdminStripeRecords = (props: JSX.IntrinsicAttributes & AdminStripeRecordsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminStripeRecords {...props} />
    </Suspense>
)

export default AdminStripeRecords
