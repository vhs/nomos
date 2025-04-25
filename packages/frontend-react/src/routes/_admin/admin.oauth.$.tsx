import { createFileRoute } from '@tanstack/react-router'

import AdminOAuth from '@/components/07-pages/admin/AdminOAuth/AdminOAuth'

export const Route = createFileRoute('/_admin/admin/oauth/$')({
    component: AdminOAuth
})
