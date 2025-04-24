import type { FC } from 'react'

import type { UserTransactionItemsProps } from './UserTransactionItems.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const UserTransactionItems: FC<UserTransactionItemsProps> = ({ fields, data }) => {
    let status = `Unknown (${data.status})`

    if (data.status === 1) status = 'Completed'
    if (data.status === 0) status = 'Pending'

    return (
        <tr key={JSON.stringify(data)}>
            <ConditionalTableCell condition={fields.Date}>{data.date?.toLocaleString()}</ConditionalTableCell>
            <ConditionalTableCell condition={fields['Transaction ID']}>{data.txn_id}</ConditionalTableCell>
            <ConditionalTableCell condition={fields['Payer Name']}>
                {data.payer_fname} {data.payer_lname}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields['Payer Email']}>{data.payer_email}</ConditionalTableCell>
            <ConditionalTableCell condition={fields.PayPal}>{data.pp}</ConditionalTableCell>
            <ConditionalTableCell condition={fields.Amount}>
                ${data.rate_amount} {data.currency}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields.Status}>
                <span>{status} </span>
            </ConditionalTableCell>
        </tr>
    )
}

export default UserTransactionItems
