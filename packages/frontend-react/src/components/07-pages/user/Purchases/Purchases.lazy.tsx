import { lazy, Suspense, type JSX } from 'react'

import type { PurchasesProps } from './Purchases.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const PurchasesLazy = lazy(async () => await import('./Purchases'))

const Purchases = (props: JSX.IntrinsicAttributes & PurchasesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <PurchasesLazy {...props} />
    </Suspense>
)

export default Purchases
