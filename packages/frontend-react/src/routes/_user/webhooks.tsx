import { createFileRoute } from '@tanstack/react-router'

import WebHooks from '@/components/07-pages/user/WebHooks/WebHooks.lazy'

export const Route = createFileRoute('/_user/webhooks')({
    component: WebHooks
})
