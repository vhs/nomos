import { createFileRoute } from '@tanstack/react-router'

import Reports from '@/components/07-pages/admin/Reports/Reports.lazy'

export const Route = createFileRoute('/_admin/admin/reports')({
    component: Reports
})
