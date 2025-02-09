import { createFileRoute } from '@tanstack/react-router'

import AdminEmailTemplates from '@/components/07-pages/admin/AdminEmailTemplates/AdminEmailTemplates.lazy'

export const Route = createFileRoute('/_admin/admin/email')({
    component: AdminEmailTemplates
})
