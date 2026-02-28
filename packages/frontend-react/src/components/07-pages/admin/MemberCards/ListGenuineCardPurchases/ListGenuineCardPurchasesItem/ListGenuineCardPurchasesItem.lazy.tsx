import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardPurchasesItemProps } from './ListGenuineCardPurchasesItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const ListGenuineCardPurchasesItemLazy = lazy(async () => await import('./ListGenuineCardPurchasesItem'))

const ListGenuineCardPurchasesItem = (
    props: JSX.IntrinsicAttributes & ListGenuineCardPurchasesItemProps
): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ListGenuineCardPurchasesItemLazy {...props} />
    </Suspense>
)

export default ListGenuineCardPurchasesItem
