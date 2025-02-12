import type { FC } from 'react'

import type { WebHooksComponentProps } from './WebHooksComponent.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const WebHooksComponent: FC<WebHooksComponentProps> = ({ data }) => (
    <tr key={data.id}>
        <ConditionalTableCell condition={'name' in data}>{data.name}</ConditionalTableCell>
        <ConditionalTableCell condition={'method' in data}>{data.method}</ConditionalTableCell>
        <ConditionalTableCell condition={'url' in data}>{data.url}</ConditionalTableCell>
        <ConditionalTableCell condition={'enabled' in data}>{data.enabled}</ConditionalTableCell>
        <td></td>
    </tr>
)

export default WebHooksComponent
