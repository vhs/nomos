import type { FC } from 'react'

import type { TransactionItemsProps } from './TransactionItems.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const TransactionItems: FC<TransactionItemsProps> = ({ fields, data }) => {
    let status = `Unknown (${data.status})`

    if (data.status === 1) status = 'Completed'
    if (data.status === 0) status = 'Pending'

    return (
        <TablePageRow key={JSON.stringify(data)}>
            <TableDataCell condition={fields.Date}>{data.date?.toLocaleString()}</TableDataCell>
            <TableDataCell condition={fields['Transaction ID']}>{data.txn_id}</TableDataCell>
            <TableDataCell condition={fields['Payer Name']}>
                {data.payer_fname} {data.payer_lname}
            </TableDataCell>
            <TableDataCell condition={fields['Payer Email']}>{data.payer_email}</TableDataCell>
            <TableDataCell condition={fields.PayPal}>{data.pp}</TableDataCell>
            <TableDataCell condition={fields.Amount}>
                ${data.rate_amount} {data.currency}
            </TableDataCell>
            <TableDataCell condition={fields.Status}>
                <span>{status} </span>
            </TableDataCell>
        </TablePageRow>
    )
}

export default TransactionItems
