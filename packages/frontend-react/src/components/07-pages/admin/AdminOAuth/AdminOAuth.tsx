import type { FC } from 'react'

import type { AdminOAuthProps } from './AdminOAuth.types'

import OAuthPage from '@/components/05-materials/OAuthPage/OAuthPage'

const AdminOAuth: FC<AdminOAuthProps> = () => (
    <OAuthPage data-testid='AdminOAuth' basePath='/admin/oauth' scope='system' />
)

export default AdminOAuth
