import { createFileRoute } from '@tanstack/react-router'

import AdminReports from '@/components/07-pages/admin/AdminReports/AdminReports.lazy'

export const Route = createFileRoute('/_admin/admin/reports')({
    component: AdminReports
})
