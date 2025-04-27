import { createFileRoute } from '@tanstack/react-router'

import Events from '@/components/07-pages/admin/Events/Events.lazy'

export const Route = createFileRoute('/_admin/events')({
    component: Events
})
