import type { FC } from 'react'

import type { ListGenuineCardPurchasesItemProps } from './ListGenuineCardPurchasesItem.types'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import Popover from '@/components/01-atoms/Popover/Popover'

const ListGenuineCardPurchasesItem: FC<ListGenuineCardPurchasesItemProps> = ({ data }) => (
    <TablePageRow data-testid='ListGenuineCardPurchasesItem'>
        <ConditionalTableCell condition={'date' in data}>{data.date.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={'status' in data}>{data.status.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell className='xl:max-w-auto max-w-[5vw] text-ellipsis' condition={'txn_id' in data}>
            <Popover content={data.txn_id.toLocaleString()} popover={data.txn_id.toLocaleString()} />
        </ConditionalTableCell>
        <ConditionalTableCell
            className='xl:max-w-auto max-w-[10vw] text-ellipsis'
            condition={'user_id' in data && 'payer_fname' in data && 'payer_lname' in data && 'payer_email' in data}
        >
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
        </ConditionalTableCell>
        <ConditionalTableCell condition={'pp' in data}>{data.pp.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={'item_name' in data && 'item_number' in data}>
            {data.item_name.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={'rate_amount' in data && 'currency' in data}>
            {parseFloat(data.rate_amount).toPrecision(4)} {data.currency.toUpperCase()}
        </ConditionalTableCell>
    </TablePageRow>
)

export default ListGenuineCardPurchasesItem
