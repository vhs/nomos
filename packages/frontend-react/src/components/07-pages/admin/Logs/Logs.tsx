import type { FC } from 'react'

import type { LogsProps } from './Logs.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/06-integrated-pages/BasePage/BasePage'

const Logs: FC<LogsProps> = () => (
    <BasePage data-testid='Logs' title='Logs'>
        <UnderConstructionBanner />
    </BasePage>
)

export default Logs
