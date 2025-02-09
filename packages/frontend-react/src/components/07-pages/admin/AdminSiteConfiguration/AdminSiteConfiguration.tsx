import type { FC } from 'react'

import type { AdminSiteConfigurationProps } from './AdminSiteConfiguration.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminSiteConfiguration: FC<AdminSiteConfigurationProps> = () => (
    <BasePage data-testid='AdminSiteConfiguration' title='Site Configuration'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminSiteConfiguration
