import { lazy, Suspense, type JSX } from 'react'

import type { AdminPaymentsProps } from './AdminPayments.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminPayments = lazy(async () => await import('./AdminPayments'))

const AdminPayments = (props: JSX.IntrinsicAttributes & AdminPaymentsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminPayments {...props} />
    </Suspense>
)

export default AdminPayments
