import type { FC } from 'react'

import TablePage from '@/components/05-materials/TablePage/TablePage'
import type { ListGenuineCardPurchasesProps } from './ListGenuineCardPurchases.types'
import {
    DefaultListGenuineCardPurchasesFilters,
    ListGenuineCardPurchasesFields,
    PrimaryListGenuineCardPurchasesFilters
} from './ListGenuineCardPurchases.utils'
import ListGenuineCardPurchasesItem from './ListGenuineCardPurchasesItem/ListGenuineCardPurchasesItem'

const ListGenuineCardPurchases: FC<ListGenuineCardPurchasesProps> = () => (
    <TablePage
        data-testid='ListGenuineCardPurchases'
        title='List of Genuine Card Purchases'
        label='card'
        serviceEndpoint='PaymentService2'
        baseServiceMethod='Payments'
        fields={ListGenuineCardPurchasesFields}
        order='date desc'
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={ListGenuineCardPurchasesItem}
        embedded={true}
        defaultFilters={DefaultListGenuineCardPurchasesFilters}
        primaryFilters={PrimaryListGenuineCardPurchasesFilters}
    />
)

export default ListGenuineCardPurchases
