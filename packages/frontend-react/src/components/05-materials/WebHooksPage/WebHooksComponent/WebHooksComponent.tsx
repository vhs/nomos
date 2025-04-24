import type { FC } from 'react'

import type { WebHooksComponentProps } from './WebHooksComponent.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const WebHooksComponent: FC<WebHooksComponentProps> = ({ fields, data }) => (
    <tr key={data.id}>
        <ConditionalTableCell condition={fields.Name}>{data.name}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Method}>{data.method}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Url}>{data.url}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Enabled}>{data.enabled}</ConditionalTableCell>
        <td></td>
    </tr>
)

export default WebHooksComponent
