import { lazy, Suspense, type JSX } from 'react'

import type { PaymentsProps } from './Payments.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const PaymentsLazy = lazy(async () => await import('./Payments'))

const Payments = (props: JSX.IntrinsicAttributes & PaymentsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PaymentsLazy {...props} />
    </Suspense>
)

export default Payments
