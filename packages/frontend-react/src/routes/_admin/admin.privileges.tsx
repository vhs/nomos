import { createFileRoute } from '@tanstack/react-router'

import Privileges from '@/components/07-pages/admin/Privileges/Privileges.lazy'

export const Route = createFileRoute('/_admin/admin/privileges')({
    component: Privileges
})
