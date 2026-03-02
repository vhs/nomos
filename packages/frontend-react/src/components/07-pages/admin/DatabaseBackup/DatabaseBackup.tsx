import type { FC } from 'react'

import type { DatabaseBackupProps } from './DatabaseBackup.types'

import UnderConstructionBanner from '@/components/02-molecules/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/04-composites/BasePage/BasePage'

const DatabaseBackup: FC<DatabaseBackupProps> = () => (
    <BasePage data-testid='DatabaseBackup' title='Database Backup'>
        <UnderConstructionBanner />
    </BasePage>
)

export default DatabaseBackup
