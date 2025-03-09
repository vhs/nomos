import { createFileRoute } from '@tanstack/react-router'

import UserDashboard from '@/components/07-pages/user/UserDashboard/UserDashboard.lazy'

export const Route = createFileRoute('/_user/dashboard')({
    component: UserDashboard
})
