import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/components/07-pages/admin/Dashboard/Dashboard.lazy'

export const Route = createFileRoute('/_admin/admin/dashboard')({
    component: Dashboard
})
