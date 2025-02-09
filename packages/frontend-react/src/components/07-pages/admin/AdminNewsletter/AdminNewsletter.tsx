import type { FC } from 'react'

import type { AdminNewsletterProps } from './AdminNewsletter.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminNewsletter: FC<AdminNewsletterProps> = () => (
    <BasePage data-testid='AdminNewsletter' title='Newsletter'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminNewsletter
