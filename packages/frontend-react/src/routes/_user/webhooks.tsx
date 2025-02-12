import { createFileRoute } from '@tanstack/react-router'

import UserWebHooks from '@/components/07-pages/user/UserWebHooks/UserWebHooks.lazy'

export const Route = createFileRoute('/_user/webhooks')({
    component: UserWebHooks
})
