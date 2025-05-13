import type { FC } from 'react'

import type { ApiKeysProps } from './ApiKeys.types'

import ApiKeysPage from '@/components/06-integrated-pages/ApiKeysPage/ApiKeysPage'

const ApiKeys: FC<ApiKeysProps> = () => <ApiKeysPage data-testid='ApiKeys' scope='user' basePath='/apikeys' />

export default ApiKeys
