import type { FC } from 'react'

import type { AdminPayPalPaymentItemProps } from './AdminPayPalPaymentItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AdminPayPalPaymentItem: FC<AdminPayPalPaymentItemProps> = ({ fields, data }) => {
    return (
        <>
            <TablePageRow>
                <TableDataCell condition={fields['TXN ID']}>{data.txn_id}</TableDataCell>
            </TablePageRow>
            <TablePageRow>
                <TableDataCell className='data-field' colSpan={10}>
                    <pre>{JSON.stringify(data, null, '\t')}</pre>
                </TableDataCell>
            </TablePageRow>
        </>
    )
}

export default AdminPayPalPaymentItem
