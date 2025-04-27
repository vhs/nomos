import { createFileRoute } from '@tanstack/react-router'

import PrivilegesEdit from '@/components/07-pages/admin/Privileges/PrivilegesEdit/PrivilegesEdit.lazy'

export const Route = createFileRoute('/_admin/admin/privileges/$privilegeId')({
    component: PrivilegesEdit
})
