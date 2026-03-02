import type { FC } from 'react'

import type { NewsletterProps } from './Newsletter.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const Newsletter: FC<NewsletterProps> = () => (
    <BasePage data-testid='Newsletter' title='Newsletter'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Newsletter
