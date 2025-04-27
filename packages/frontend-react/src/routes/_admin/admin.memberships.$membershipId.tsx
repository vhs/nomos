import { createFileRoute } from '@tanstack/react-router'

import MembershipsEdit from '@/components/07-pages/admin/Memberships/MembershipsEdit/MembershipsEdit.lazy'

export const Route = createFileRoute('/_admin/admin/memberships/$membershipId')({
    component: MembershipsEdit
})
