import { createFileRoute } from '@tanstack/react-router'

import AccessHistory from '@/components/07-pages/user/AccessHistory/AccessHistory.lazy'

export const Route = createFileRoute('/_user/user/accesslogs')({
    component: AccessHistory
})
