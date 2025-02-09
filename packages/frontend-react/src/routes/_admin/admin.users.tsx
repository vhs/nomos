import { createFileRoute } from '@tanstack/react-router'

import AdminUsers from '@/components/07-pages/admin/AdminUsers/AdminUsers.lazy'

export const Route = createFileRoute('/_admin/admin/users')({
    component: AdminUsers
})
