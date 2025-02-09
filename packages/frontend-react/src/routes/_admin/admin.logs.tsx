import { createFileRoute } from '@tanstack/react-router'

import AdminLogs from '@/components/07-pages/admin/AdminLogs/AdminLogs.lazy'

export const Route = createFileRoute('/_admin/admin/logs')({
    component: AdminLogs
})
