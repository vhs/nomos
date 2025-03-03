import type { FC } from 'react'

import type { AdminApiKeysProps } from './AdminApiKeys.types'

import ApiKeysPage from '@/components/05-materials/ApiKeysPage/ApiKeysPage'

const AdminApiKeys: FC<AdminApiKeysProps> = () => (
    <ApiKeysPage data-testid='AdminApiKeys' scope='system' basePath='/admin/systemkeys' />
)

export default AdminApiKeys
