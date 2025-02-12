import { createFileRoute } from '@tanstack/react-router'

import AdminUsersEdit from '@/components/07-pages/admin/AdminUsers/AdminUsersEdit/AdminUsersEdit.lazy'

export const Route = createFileRoute('/_admin/admin/users/$userId')({
    component: AdminUsersEdit
})
