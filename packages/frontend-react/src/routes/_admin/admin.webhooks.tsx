import { createFileRoute } from '@tanstack/react-router'

import WebHooks from '@/components/07-pages/admin/WebHooks/WebHooks.lazy'

export const Route = createFileRoute('/_admin/admin/webhooks')({
    component: WebHooks
})
