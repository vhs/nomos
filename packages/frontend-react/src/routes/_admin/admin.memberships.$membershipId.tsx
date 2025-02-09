import { createFileRoute } from '@tanstack/react-router'

import AdminMembershipsEdit from '@/components/07-pages/admin/AdminMembershipsEdit/AdminMembershipsEdit.lazy'

export const Route = createFileRoute('/_admin/admin/memberships/$membershipId')({
    component: AdminMembershipsEdit
})
