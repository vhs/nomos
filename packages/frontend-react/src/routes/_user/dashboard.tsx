import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/components/07-pages/user/Dashboard/Dashboard'

export const Route = createFileRoute('/_user/dashboard')({
    component: Dashboard
})
