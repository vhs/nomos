import type { FC } from 'react'

import type { AdminTemplateNameItemProps } from './AdminTemplateNameItem.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminTemplateNameItem: FC<AdminTemplateNameItemProps> = ({ data }) => (
    <tr data-testid='AdminTemplateNameItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <ConditionalTableCell condition={k in data} key={k}>
                    {v != null && typeof v === 'object' ? <pre>{JSON.stringify(v)}</pre> : String(v)}
                </ConditionalTableCell>
            ))}
    </tr>
)

export default AdminTemplateNameItem
