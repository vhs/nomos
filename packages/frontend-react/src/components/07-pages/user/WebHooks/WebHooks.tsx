import type { FC } from 'react'

import type { WebHooksProps } from './WebHooks.types'

import WebHooksPage from '@/components/07-integrated-pages/WebHooksPage/WebHooksPage'

const WebHooks: FC<WebHooksProps> = () => {
    return <WebHooksPage data-testid='WebHooks' user={true} />
}

export default WebHooks
