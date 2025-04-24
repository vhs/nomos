import type { FC } from 'react'

import type { AdminPayPalPaymentItemProps } from './AdminPayPalPaymentItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminPayPalPaymentItem: FC<AdminPayPalPaymentItemProps> = ({ fields, data }) => {
    return (
        <div data-testid='AdminPayPalPaymentItem'>
            <TablePageRow>
                <ConditionalTableCell condition={fields['TXN ID']}>{data.txn_id}</ConditionalTableCell>
            </TablePageRow>
            <pre>{JSON.stringify(data, null, '\t')}</pre>
        </div>
    )
}

export default AdminPayPalPaymentItem
