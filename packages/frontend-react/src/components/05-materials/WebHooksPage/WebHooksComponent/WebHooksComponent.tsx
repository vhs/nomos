import type { FC } from 'react'

import type { WebHooksComponentProps } from './WebHooksComponent.types'

const WebHooksComponent: FC<WebHooksComponentProps> = ({ data }) => (
    <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.method}</td>
        <td>{data.url}</td>
        <td>{data.enabled}</td>
        <td></td>
    </tr>
)

export default WebHooksComponent
