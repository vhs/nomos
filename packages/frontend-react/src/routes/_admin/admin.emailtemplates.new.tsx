import { createFileRoute } from '@tanstack/react-router'

import AdminEmailTemplateCreate from '@/components/07-pages/admin/AdminEmailTemplates/AdminEmailTemplateCreate/AdminEmailTemplateCreate.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates/new')({
    component: AdminEmailTemplateCreate
})
