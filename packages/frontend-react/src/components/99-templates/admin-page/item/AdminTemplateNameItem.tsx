import type { FC } from 'react'

import type { AdminTemplateNameItemProps } from './AdminTemplateNameItem.types'

const AdminTemplateNameItem: FC<AdminTemplateNameItemProps> = ({ data }) => (
    <tr className='' data-testid='AdminTemplateNameItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <td key={k}>
                    <pre>{JSON.stringify(v, null, '\t')}</pre>
                </td>
            ))}
    </tr>
)

export default AdminTemplateNameItem
