import { createFileRoute } from '@tanstack/react-router'

import DoorAccess from '@/components/07-pages/user/DoorAccess/DoorAccess.lazy'

export const Route = createFileRoute('/_user/dooraccess')({
    component: DoorAccess
})
