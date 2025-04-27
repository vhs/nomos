import { lazy, Suspense, type JSX } from 'react'

import type { PayPalPaymentItemProps } from './PayPalPaymentItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const PayPalPaymentItemLazy = lazy(async () => await import('./PayPalPaymentItem'))

const PayPalPaymentItem = (props: JSX.IntrinsicAttributes & PayPalPaymentItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PayPalPaymentItemLazy {...props} />
    </Suspense>
)

export default PayPalPaymentItem
