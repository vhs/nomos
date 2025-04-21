import type { FC } from 'react'

import TablePage from '@/components/05-materials/TablePage/TablePage'
import type { ListGenuineCardsProps } from './ListGenuineCards.types'
import { ListGenuineCardsFields, PrimaryListGenuineCardsFilters } from './ListGenuineCards.utils'
import ListGenuineCardsItem from './ListGenuineCardsItem/ListGenuineCardsItem'

const ListGenuineCards: FC<ListGenuineCardsProps> = () => (
    <TablePage
        data-testid='ListGenuineCards'
        title='List of Genuine Cards'
        label='card'
        serviceEndpoint='MemberCardService2'
        baseServiceMethod='GenuineCards'
        fields={ListGenuineCardsFields}
        order='created desc'
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={ListGenuineCardsItem}
        embedded={true}
        primaryFilters={PrimaryListGenuineCardsFilters}
    />
)

export default ListGenuineCards
