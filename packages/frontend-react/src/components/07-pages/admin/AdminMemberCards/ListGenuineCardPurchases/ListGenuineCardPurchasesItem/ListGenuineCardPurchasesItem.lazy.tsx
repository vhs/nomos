import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardPurchasesItemProps } from './ListGenuineCardPurchasesItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyListGenuineCardPurchasesItem = lazy(async () => await import('./ListGenuineCardPurchasesItem'))

const ListGenuineCardPurchasesItem = (props: JSX.IntrinsicAttributes & ListGenuineCardPurchasesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyListGenuineCardPurchasesItem {...props} />
    </Suspense>
)

export default ListGenuineCardPurchasesItem
