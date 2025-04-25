import { createFileRoute } from '@tanstack/react-router'

import AdminPrivilegesEdit from '@/components/07-pages/admin/AdminPrivileges/AdminPrivilegesEdit/AdminPrivilegesEdit.lazy'

export const Route = createFileRoute('/_admin/admin/privileges/$privilegeId')({
    component: AdminPrivilegesEdit
})
