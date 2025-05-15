import type { FC } from 'react'

import type { AdminTemplateNameItemProps } from './AdminTemplateNameItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AdminTemplateNameItem: FC<AdminTemplateNameItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminTemplateNameItem'>
        <TableDataCell condition={fields.Field}>{JSON.stringify(data.field)}</TableDataCell>
    </TablePageRow>
)

export default AdminTemplateNameItem
