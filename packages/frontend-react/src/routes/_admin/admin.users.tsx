import { createFileRoute } from '@tanstack/react-router'

import Users from '@/components/07-pages/admin/Users/Users.lazy'

export const Route = createFileRoute('/_admin/admin/users')({
    component: Users
})
