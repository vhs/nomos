import { createFileRoute } from '@tanstack/react-router'

import AdminMemberships from '@/components/07-pages/admin/AdminMemberships/AdminMemberships.lazy'

export const Route = createFileRoute('/_admin/admin/memberships')({
    component: AdminMemberships
})
