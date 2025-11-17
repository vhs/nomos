import { createFileRoute } from '@tanstack/react-router'

import DatabaseBackup from '@/components/07-pages/admin/DatabaseBackup/DatabaseBackup.lazy'

export const Route = createFileRoute('/_admin/backup')({
    component: DatabaseBackup
})
