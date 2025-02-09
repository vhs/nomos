import { createFileRoute } from '@tanstack/react-router'

import AdminNewsletter from '@/components/07-pages/admin/AdminNewsletter/AdminNewsletter.lazy'

export const Route = createFileRoute('/_admin/admin/newsletter')({
    component: AdminNewsletter
})
