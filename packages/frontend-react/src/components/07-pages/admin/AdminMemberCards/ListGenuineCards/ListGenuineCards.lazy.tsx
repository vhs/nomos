import { lazy, Suspense, type JSX } from 'react'

import type { ListGenuineCardsProps } from './ListGenuineCards.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const ListGenuineCardsLazy = lazy(async () => await import('./ListGenuineCards'))

const ListGenuineCards = (props: JSX.IntrinsicAttributes & ListGenuineCardsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ListGenuineCardsLazy {...props} />
    </Suspense>
)

export default ListGenuineCards
