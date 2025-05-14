import type { FC } from 'react'

import type { LogsProps } from './Logs.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const Logs: FC<LogsProps> = () => (
    <BasePage data-testid='Logs' title='Logs'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Logs
