import type { FC } from 'react'

import type { NewsletterProps } from './Newsletter.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/06-integrated-pages/BasePage/BasePage'

const Newsletter: FC<NewsletterProps> = () => (
    <BasePage data-testid='Newsletter' title='Newsletter'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Newsletter
