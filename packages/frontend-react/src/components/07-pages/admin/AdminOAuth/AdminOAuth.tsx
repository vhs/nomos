import type { FC } from 'react'

import type { AdminOAuthProps } from './AdminOAuth.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminOAuth: FC<AdminOAuthProps> = () => (
    <BasePage data-testid='AdminOAuth' title='OAuth'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminOAuth
