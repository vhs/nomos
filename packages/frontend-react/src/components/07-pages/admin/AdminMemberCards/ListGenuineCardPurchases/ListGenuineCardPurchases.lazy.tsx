import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardPurchasesProps } from './ListGenuineCardPurchases.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyListGenuineCardPurchases = lazy(async () => await import('./ListGenuineCardPurchases'))

const ListGenuineCardPurchases = (props: JSX.IntrinsicAttributes & ListGenuineCardPurchasesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyListGenuineCardPurchases {...props} />
    </Suspense>
)

export default ListGenuineCardPurchases
