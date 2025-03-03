import type { FC } from 'react'

import type { UserApiKeysProps } from './UserApiKeys.types'

import ApiKeysPage from '@/components/05-materials/ApiKeysPage/ApiKeysPage'

const UserApiKeys: FC<UserApiKeysProps> = () => (
    <ApiKeysPage data-testid='UserApiKeys' scope='user' basePath='/apikeys' />
)

export default UserApiKeys
