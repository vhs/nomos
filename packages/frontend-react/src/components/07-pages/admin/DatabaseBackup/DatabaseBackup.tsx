import type { FC } from 'react'

import type { DatabaseBackupProps } from './DatabaseBackup.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const DatabaseBackup: FC<DatabaseBackupProps> = () => (
    <BasePage data-testid='DatabaseBackup' title='Database Backup'>
        <UnderConstructionBanner />
    </BasePage>
)

export default DatabaseBackup
