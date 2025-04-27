import { lazy, Suspense, type JSX } from 'react'

import type { AdminPayPalPaymentItemProps } from './AdminPayPalPaymentItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminPayPalPaymentItemLazy = lazy(async () => await import('./AdminPayPalPaymentItem'))

const AdminPayPalPaymentItem = (props: JSX.IntrinsicAttributes & AdminPayPalPaymentItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminPayPalPaymentItemLazy {...props} />
    </Suspense>
)

export default AdminPayPalPaymentItem
