import { createFileRoute } from '@tanstack/react-router'

import AdminEvents from '@/components/07-pages/admin/AdminEvents/AdminEvents.lazy'

export const Route = createFileRoute('/_admin/admin/events')({
    component: AdminEvents
})
