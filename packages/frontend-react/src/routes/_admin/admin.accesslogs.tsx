import { createFileRoute } from '@tanstack/react-router'

import AccessLogs from '@/components/07-pages/admin/AccessLogs/AccessLogs.lazy'

export const Route = createFileRoute('/_admin/admin/accesslogs')({
    component: AccessLogs
})
