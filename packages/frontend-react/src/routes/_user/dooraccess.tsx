import { createFileRoute } from '@tanstack/react-router'

import UserDoorAccess from '@/components/07-pages/user/UserDoorAccess/UserDoorAccess.lazy'

export const Route = createFileRoute('/_user/dooraccess')({
    component: UserDoorAccess
})
