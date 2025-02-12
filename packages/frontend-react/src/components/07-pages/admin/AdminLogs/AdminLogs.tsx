import type { FC } from 'react'

import type { AdminLogsProps } from './AdminLogs.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminLogs: FC<AdminLogsProps> = () => (
    <BasePage data-testid='AdminLogs' title='Logs'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminLogs
