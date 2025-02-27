import { lazy, Suspense, type JSX } from 'react'

import type { AdminPaymentGatewaysProps } from './AdminPaymentGateways.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminPaymentGateways = lazy(async () => await import('./AdminPaymentGateways'))

const AdminPaymentGateways = (props: JSX.IntrinsicAttributes & AdminPaymentGatewaysProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminPaymentGateways {...props} />
    </Suspense>
)

export default AdminPaymentGateways
