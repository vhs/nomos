import { createFileRoute } from '@tanstack/react-router'

import UsersNew from '@/components/07-pages/admin/Users/UsersNew/UsersNew.lazy'

export const Route = createFileRoute('/_admin/admin/users/new')({
    component: UsersNew
})
