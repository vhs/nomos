import { createFileRoute } from '@tanstack/react-router'

import Memberships from '@/components/07-pages/admin/Memberships/Memberships.lazy'

export const Route = createFileRoute('/_admin/admin/memberships')({
    component: Memberships
})
