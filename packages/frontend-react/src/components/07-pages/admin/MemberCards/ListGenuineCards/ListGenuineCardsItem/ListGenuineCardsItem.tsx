import type { FC } from 'react'

import type { ListGenuineCardsItemProps } from './ListGenuineCardsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const ListGenuineCardsItem: FC<ListGenuineCardsItemProps> = ({ fields, data }) => {
    return (
        <TablePageRow data-testid='ListGenuineCardsItem'>
            <TableDataCell condition={fields.Card}>{data.key}</TableDataCell>
            <TableDataCell condition={fields.Created}>{data.created.toString()}</TableDataCell>
            <TableDataCell condition={fields.Issued}>{(data.issued ?? '').toLocaleString()}</TableDataCell>
            <TableDataCell condition={fields.Active}>{data.active ? 'Active' : 'Inactive'}</TableDataCell>
            <TableDataCell condition={fields['Payment Id']}>{data.paymentid}</TableDataCell>
            <TableDataCell condition={fields['User Id']}>{data.userid}</TableDataCell>
            <TableDataCell condition={fields['Owner Email']}>{data.owneremail}</TableDataCell>
            <TableDataCell condition={fields.Notes}>{data.notes}</TableDataCell>
        </TablePageRow>
    )
}

export default ListGenuineCardsItem
