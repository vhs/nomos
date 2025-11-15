import type { FC } from 'react'

import type { PayPalPaymentItemProps } from './PayPalPaymentItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const PayPalPaymentItem: FC<PayPalPaymentItemProps> = ({ fields, data }) => {
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

export default PayPalPaymentItem
