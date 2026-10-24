import { createFileRoute } from '@tanstack/react-router'

import UsersEdit from '@/components/07-pages/admin/Users/UsersEdit/UsersEdit.lazy'

export const Route = createFileRoute('/_admin/admin/users/$userId')({
    component: UsersEdit
})
