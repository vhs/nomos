import { createFileRoute } from '@tanstack/react-router'

import AdminDatabaseBackup from '@/components/07-pages/admin/AdminDatabaseBackup/AdminDatabaseBackup.lazy'

export const Route = createFileRoute('/_admin/admin/databasebackup')({
    component: AdminDatabaseBackup
})
