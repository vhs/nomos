import { createFileRoute } from '@tanstack/react-router'

import EmailTemplateCreate from '@/components/07-pages/admin/EmailTemplates/EmailTemplateCreate/EmailTemplateCreate.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates/new')({
    component: EmailTemplateCreate
})
