import { createFileRoute } from '@tanstack/react-router'

import AdminOAuth from '@/components/07-pages/admin/AdminOAuth/AdminOAuth.lazy'

export const Route = createFileRoute('/_admin/oauth')({
    component: AdminOAuth
})
