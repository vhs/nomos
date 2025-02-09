import type { FC } from 'react'

import type { UserTransactionItemsProps } from './UserTransactionItems.types'

const UserTransactionItems: FC<UserTransactionItemsProps> = ({ data }) => {
    let status = `Unknown (${data.status})`

    if (data.status === 1) status = 'Completed'
    if (data.status === 0) status = 'Pending'

    return (
        <tr key={data.id}>
            <td>{data.date.toLocaleString()}</td>
            <td>{data.txn_id}</td>
            <td>
                {data.payer_fname} {data.payer_lname}
            </td>
            <td>{data.payer_email}</td>
            <td>{data.pp}</td>
            <td>
                ${data.rate_amount} {data.currency}
            </td>
            <td>
                <span>{status} </span>
            </td>
        </tr>
    )
}

export default UserTransactionItems
