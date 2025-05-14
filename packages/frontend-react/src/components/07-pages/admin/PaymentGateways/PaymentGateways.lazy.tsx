import { lazy, Suspense, type JSX } from 'react'

import type { PaymentGatewaysProps } from './PaymentGateways.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const PaymentGatewaysLazy = lazy(async () => await import('./PaymentGateways'))

const PaymentGateways = (props: JSX.IntrinsicAttributes & PaymentGatewaysProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PaymentGatewaysLazy {...props} />
    </Suspense>
)

export default PaymentGateways
