import type { FC } from 'react'

import type { SiteConfigurationProps } from './SiteConfiguration.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const SiteConfiguration: FC<SiteConfigurationProps> = () => (
    <BasePage data-testid='SiteConfiguration' title='Site Configuration'>
        <UnderConstructionBanner />
    </BasePage>
)

export default SiteConfiguration
