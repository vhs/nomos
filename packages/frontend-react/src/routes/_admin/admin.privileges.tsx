import { createFileRoute } from '@tanstack/react-router'

import AdminPrivileges from '@/components/07-pages/admin/AdminPrivileges/AdminPrivileges.lazy'

export const Route = createFileRoute('/_admin/admin/privileges')({
    component: AdminPrivileges
})
