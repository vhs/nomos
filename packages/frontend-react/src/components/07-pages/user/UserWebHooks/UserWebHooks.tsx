import type { FC } from 'react'

import type { UserWebHooksProps } from './UserWebHooks.types'

import WebHooksPage from '@/components/05-materials/WebHooksPage/WebHooksPage'

const UserWebHooks: FC<UserWebHooksProps> = () => {
    return <WebHooksPage data-testid='UserWebHooks' user={true} />
}

export default UserWebHooks
