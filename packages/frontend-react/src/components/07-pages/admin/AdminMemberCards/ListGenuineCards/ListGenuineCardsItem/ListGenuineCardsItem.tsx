import type { FC } from 'react'

import type { ListGenuineCardsItemProps } from './ListGenuineCardsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const ListGenuineCardsItem: FC<ListGenuineCardsItemProps> = ({ data }) => {
    return (
        <TablePageRow data-testid='ListGenuineCardsItem'>
            <ConditionalTableCell condition={'key' in data}>{data.key}</ConditionalTableCell>
            <ConditionalTableCell condition={'created' in data}>{data.created.toString()}</ConditionalTableCell>
            <ConditionalTableCell condition={'issued' in data}>
                {(data.issued ?? '').toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'active' in data}>
                {data.active ? 'Active' : 'Inactive'}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'paymentid' in data}>{data.paymentid}</ConditionalTableCell>
            <ConditionalTableCell condition={'userid' in data}>{data.userid}</ConditionalTableCell>
            <ConditionalTableCell condition={'owneremail' in data}>{data.owneremail}</ConditionalTableCell>
            <ConditionalTableCell condition={'notes' in data}>{data.notes}</ConditionalTableCell>
        </TablePageRow>
    )
}

export default ListGenuineCardsItem
