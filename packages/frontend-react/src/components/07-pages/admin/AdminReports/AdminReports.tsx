import type { FC } from 'react'

import type { AdminReportsProps } from './AdminReports.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminReports: FC<AdminReportsProps> = () => (
    <BasePage data-testid='AdminReports' title='Reports'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminReports
