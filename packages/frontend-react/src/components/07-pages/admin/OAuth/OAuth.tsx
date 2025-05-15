import type { FC } from 'react'

import type { OAuthProps } from './OAuth.types'

import OAuthPage from '@/components/07-integrated-pages/OAuthPage/OAuthPage'

const OAuth: FC<OAuthProps> = () => <OAuthPage data-testid='OAuth' basePath='/admin/oauth' scope='system' />

export default OAuth
