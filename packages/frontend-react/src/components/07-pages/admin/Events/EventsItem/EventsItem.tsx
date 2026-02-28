import type { FC } from 'react'

import type { EventsItemProps } from './EventsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import EnabledCheckMark from '@/components/02-molecules/EnabledCheckMark/EnabledCheckMark'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const EventsItem: FC<EventsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='EventsItem'>
        <TableDataCell condition={fields.Name}>{data.name.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Domain}>{data.domain.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Event}>{data.event.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Description}>{data.description.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Enabled}>
            <EnabledCheckMark checked={data.enabled} />
        </TableDataCell>
        {/* <TableDataCell condition={fields['Privileges']}>
            {data.privileges.toLocaleString()}
        </TableDataCell> */}
    </TablePageRow>
)

export default EventsItem
