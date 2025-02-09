import { createFileRoute } from '@tanstack/react-router'

import AdminWebHooks from '@/components/07-pages/admin/AdminWebHooks/AdminWebHooks.lazy'

export const Route = createFileRoute('/_admin/admin/webhooks')({
    component: AdminWebHooks
})
