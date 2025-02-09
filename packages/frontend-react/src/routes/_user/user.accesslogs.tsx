import { createFileRoute } from '@tanstack/react-router'

import UserAccessHistory from '@/components/07-pages/user/UserAccessHistory/UserAccessHistory.lazy'

export const Route = createFileRoute('/_user/user/accesslogs')({
    component: UserAccessHistory
})
