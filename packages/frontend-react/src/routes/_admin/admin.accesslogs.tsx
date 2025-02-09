import { createFileRoute } from '@tanstack/react-router'

import AdminAccessLogs from '@/components/07-pages/admin/AdminAccessLogs/AdminAccessLogs.lazy'

export const Route = createFileRoute('/_admin/admin/accesslogs')({
    component: AdminAccessLogs
})
