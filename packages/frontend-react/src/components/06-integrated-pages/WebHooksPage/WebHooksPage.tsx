import type { FC } from 'react'

import type { WebHooksPageProps } from './WebHooksPage.types'

import TablePage from '@/components/06-integrated-pages/TablePage/TablePage'

import CreateWebHookForm from './CreateWebHookForm/CreateWebHookForm'
import WebHooksItem from './WebHooksItem/WebHooksItem'
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
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
            component={WebHooksItem}
            order={['id']}
            actions={[<CreateWebHookForm key='CreateWebHookForm' />]}
        />
    )
}

export default WebHooksPage
