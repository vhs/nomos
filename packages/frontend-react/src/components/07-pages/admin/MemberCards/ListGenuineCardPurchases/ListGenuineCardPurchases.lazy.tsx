import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardPurchasesProps } from './ListGenuineCardPurchases.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const ListGenuineCardPurchasesLazy = lazy(async () => await import('./ListGenuineCardPurchases'))

const ListGenuineCardPurchases = (props: JSX.IntrinsicAttributes & ListGenuineCardPurchasesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ListGenuineCardPurchasesLazy {...props} />
    </Suspense>
)

export default ListGenuineCardPurchases
