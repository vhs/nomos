import type { FC } from 'react'

import type { SiteConfigurationProps } from './SiteConfiguration.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/06-integrated-pages/BasePage/BasePage'

const SiteConfiguration: FC<SiteConfigurationProps> = () => (
    <BasePage data-testid='SiteConfiguration' title='Site Configuration'>
        <UnderConstructionBanner />
    </BasePage>
)

export default SiteConfiguration
