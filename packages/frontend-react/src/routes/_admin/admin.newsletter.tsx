import { createFileRoute } from '@tanstack/react-router'

import Newsletter from '@/components/07-pages/admin/Newsletter/Newsletter.lazy'

export const Route = createFileRoute('/_admin/admin/newsletter')({
    component: Newsletter
})
