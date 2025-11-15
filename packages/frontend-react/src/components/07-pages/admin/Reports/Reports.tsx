import type { FC } from 'react'

import type { ReportsProps } from './Reports.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const Reports: FC<ReportsProps> = () => (
    <BasePage data-testid='Reports' title='Reports'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Reports
