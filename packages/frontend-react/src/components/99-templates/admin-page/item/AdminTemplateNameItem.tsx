import type { FC } from 'react'

import type { AdminTemplateNameItemProps } from './AdminTemplateNameItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminTemplateNameItem: FC<AdminTemplateNameItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminTemplateNameItem'>
        <ConditionalTableCell condition={fields.Field}>{JSON.stringify(data.field)}</ConditionalTableCell>
    </TablePageRow>
)

export default AdminTemplateNameItem
