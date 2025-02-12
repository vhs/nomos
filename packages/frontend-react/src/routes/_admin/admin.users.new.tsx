import { createFileRoute } from '@tanstack/react-router'

import AdminUsersNew from '@/components/07-pages/admin/AdminUsersNew/AdminUsersNew.lazy'

export const Route = createFileRoute('/_admin/admin/users/new')({
    component: AdminUsersNew
})
