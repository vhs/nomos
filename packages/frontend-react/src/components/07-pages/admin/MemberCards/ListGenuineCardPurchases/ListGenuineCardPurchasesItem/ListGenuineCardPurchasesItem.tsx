import type { FC } from 'react'

import type { ListGenuineCardPurchasesItemProps } from './ListGenuineCardPurchasesItem.types'

import Popover from '@/components/01-atoms/Popover/Popover'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const ListGenuineCardPurchasesItem: FC<ListGenuineCardPurchasesItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='ListGenuineCardPurchasesItem'>
        <TableDataCell condition={fields.Date}>{data.date.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Status}>{data.status.toLocaleString()}</TableDataCell>
        <TableDataCell className='xl:max-w-auto max-w-[5vw] text-ellipsis' condition={fields['TXN ID']}>
            <Popover content={data.txn_id.toLocaleString()} popover={data.txn_id.toLocaleString()} />
        </TableDataCell>
        <TableDataCell className='xl:max-w-auto max-w-[10vw] text-ellipsis' condition={fields.User}>
            <Popover
                content={
                    <>
                        {data.payer_fname} {data.payer_lname}
                    </>
                }
                popover={
                    <>
                        {data.payer_fname} {data.payer_lname}
                        <br />
                        {data.payer_email}
                    </>
                }
            />
        </TableDataCell>
        <TableDataCell condition={fields.Processor}>{data.pp.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Item && fields.Item_number}>{data.item_name.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Price && fields.Currency}>
            {parseFloat(data.rate_amount).toPrecision(4)} {data.currency.toUpperCase()}
        </TableDataCell>
    </TablePageRow>
)

export default ListGenuineCardPurchasesItem
