import { createFileRoute } from '@tanstack/react-router'

import Logs from '@/components/07-pages/admin/Logs/Logs.lazy'

export const Route = createFileRoute('/_admin/logs')({
    component: Logs
})
