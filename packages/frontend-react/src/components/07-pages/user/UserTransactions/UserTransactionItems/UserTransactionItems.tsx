import type { FC } from 'react'

import type { UserTransactionItemsProps } from './UserTransactionItems.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const UserTransactionItems: FC<UserTransactionItemsProps> = ({ data }) => {
    let status = `Unknown (${data.status})`

    if (data.status === 1) status = 'Completed'
    if (data.status === 0) status = 'Pending'

    return (
        <tr key={JSON.stringify(data)}>
            <ConditionalTableCell condition={'date' in data}>{data.date?.toLocaleString()}</ConditionalTableCell>
            <ConditionalTableCell condition={'txn_id' in data}>{data.txn_id}</ConditionalTableCell>
            <ConditionalTableCell condition={'payer_fname' in data && 'payer_lname' in data}>
                {data.payer_fname} {data.payer_lname}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'payer_email' in data}>{data.payer_email}</ConditionalTableCell>
            <ConditionalTableCell condition={'pp' in data}>{data.pp}</ConditionalTableCell>
            <ConditionalTableCell condition={'rate_amount' in data && 'currency' in data}>
                ${data.rate_amount} {data.currency}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'status' in data}>
                <span>{status} </span>
            </ConditionalTableCell>
        </tr>
    )
}

export default UserTransactionItems
