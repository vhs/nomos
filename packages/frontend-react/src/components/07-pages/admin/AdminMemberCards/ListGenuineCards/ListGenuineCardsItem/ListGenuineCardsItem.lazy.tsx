import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardsItemProps } from './ListGenuineCardsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyListGenuineCardsItem = lazy(async () => await import('./ListGenuineCardsItem'))

const ListGenuineCardsItem = (props: JSX.IntrinsicAttributes & ListGenuineCardsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyListGenuineCardsItem {...props} />
    </Suspense>
)

export default ListGenuineCardsItem
