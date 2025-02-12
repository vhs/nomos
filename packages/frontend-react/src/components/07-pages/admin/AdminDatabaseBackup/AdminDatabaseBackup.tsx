import type { FC } from 'react'

import type { AdminDatabaseBackupProps } from './AdminDatabaseBackup.types'

import UnderConstructionBanner from '@/components/01-atoms/UnderConstructionBanner/UnderConstructionBanner'
import BasePage from '@/components/05-materials/BasePage/BasePage'

const AdminDatabaseBackup: FC<AdminDatabaseBackupProps> = () => (
    <BasePage data-testid='AdminDatabaseBackup' title='Database Backup'>
        <UnderConstructionBanner />
    </BasePage>
)

export default AdminDatabaseBackup
