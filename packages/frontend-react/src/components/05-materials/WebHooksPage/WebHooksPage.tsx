import type { FC } from 'react'

import type { WebHooksPageProps } from './WebHooksPage.types'

import TablePage from '../TablePage/TablePage'

import CreateWebHookForm from './CreateWebHookForm/CreateWebHookForm'
import WebHooksComponent from './WebHooksComponent/WebHooksComponent'
import { webhookFields } from './WebHooksPage.utils'

const WebHooksPage: FC<WebHooksPageProps> = ({ user }) => {
    return (
        <TablePage
            data-testid='WebHooksPage'
            title='Web Hooks'
            label={'webhook'}
            serviceEndpoint={'WebHookService2'}
            baseServiceMethod={'Hooks'}
            user={user}
            fields={webhookFields}
            // @ts-expect-error This is fucky. Technical term.
            component={WebHooksComponent}
            order={['id']}
            actions={[<CreateWebHookForm key='CreateWebHookForm' />]}
        />
    )
}

export default WebHooksPage
