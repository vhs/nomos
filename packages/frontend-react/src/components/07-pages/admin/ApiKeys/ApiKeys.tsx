import type { FC } from 'react'

import type { ApiKeysProps } from './ApiKeys.types'

import ApiKeysPage from '@/components/06-integrated-pages/ApiKeysPage/ApiKeysPage'

const ApiKeys: FC<ApiKeysProps> = () => (
    <ApiKeysPage data-testid='ApiKeys' scope='system' basePath='/admin/systemkeys' />
)

export default ApiKeys
