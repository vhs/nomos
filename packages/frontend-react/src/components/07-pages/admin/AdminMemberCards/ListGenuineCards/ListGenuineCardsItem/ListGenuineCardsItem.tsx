import type { FC } from 'react'

import type { ListGenuineCardsItemProps } from './ListGenuineCardsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const ListGenuineCardsItem: FC<ListGenuineCardsItemProps> = ({ fields, data }) => {
    return (
        <TablePageRow data-testid='ListGenuineCardsItem'>
            <ConditionalTableCell condition={fields.Card}>{data.key}</ConditionalTableCell>
            <ConditionalTableCell condition={fields.Created}>{data.created.toString()}</ConditionalTableCell>
            <ConditionalTableCell condition={fields.Issued}>
                {(data.issued ?? '').toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields.Active}>{data.active ? 'Active' : 'Inactive'}</ConditionalTableCell>
            <ConditionalTableCell condition={fields['Payment Id']}>{data.paymentid}</ConditionalTableCell>
            <ConditionalTableCell condition={fields['User Id']}>{data.userid}</ConditionalTableCell>
            <ConditionalTableCell condition={fields['Owner Email']}>{data.owneremail}</ConditionalTableCell>
            <ConditionalTableCell condition={fields.Notes}>{data.notes}</ConditionalTableCell>
        </TablePageRow>
    )
}

export default ListGenuineCardsItem
