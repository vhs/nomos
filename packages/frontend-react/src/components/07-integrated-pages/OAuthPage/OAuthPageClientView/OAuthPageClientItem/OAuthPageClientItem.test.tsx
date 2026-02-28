/* eslint-disable @typescript-eslint/naming-convention */
import { createRoot } from 'react-dom/client'

import type { AppClient } from '@/types/validators/records'

import OAuthPageClientItem from './OAuthPageClientItem'

const testAppClientData: AppClient = {
    id: 0,
    description: '',
    enabled: false,
    expires: '',
    name: '',
    redirecturi: '',
    secret: '',
    url: '',
    userid: 0
}

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <OAuthPageClientItem
            fields={{
                'Name': true,
                'Description': true,
                'Url': true,
                'Redirect URI': true,
                'Secret': true,
                'Header': true,
                'Enabled': true
            }}
            data={testAppClientData}
        />
    )
    root.unmount()
})
