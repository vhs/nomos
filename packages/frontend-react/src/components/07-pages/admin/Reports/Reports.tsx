import type { FC } from 'react'

import type { ReportsProps } from './Reports.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const Reports: FC<ReportsProps> = () => (
    <BasePage data-testid='Reports' title='Reports'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Reports
