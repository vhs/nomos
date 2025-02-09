import { createFileRoute } from '@tanstack/react-router'

import UserGranting from '@/components/07-pages/user/UserGranting/UserGranting.lazy'

export const Route = createFileRoute('/_user/grants')({
    component: UserGranting
})
