import { createFileRoute } from '@tanstack/react-router'

import AdminDashboard from '@/components/07-pages/admin/AdminDashboard/AdminDashboard.lazy'

export const Route = createFileRoute('/_admin/admin/dashboard')({
    component: AdminDashboard
})
