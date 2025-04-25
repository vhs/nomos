import type { FC } from 'react'

import type { WebHooksComponentProps } from './WebHooksComponent.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const WebHooksComponent: FC<WebHooksComponentProps> = ({ fields, data }) => (
    <TablePageRow key={data.id}>
        <TableDataCell condition={fields.Name}>{data.name}</TableDataCell>
        <TableDataCell condition={fields.Method}>{data.method}</TableDataCell>
        <TableDataCell condition={fields.Url}>{data.url}</TableDataCell>
        <TableDataCell condition={fields.Enabled}>{data.enabled}</TableDataCell>
        <TableDataCell></TableDataCell>
    </TablePageRow>
)

export default WebHooksComponent
