import type { FC } from 'react'

import type { AdminEmailTemplatesProps } from './AdminEmailTemplates.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminEmailTemplates: FC<AdminEmailTemplatesProps> = () => (
    <BasePage data-testid='AdminEmailTemplates' title='Email Templates'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminEmailTemplates
