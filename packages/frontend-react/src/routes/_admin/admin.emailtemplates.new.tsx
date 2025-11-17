import { createFileRoute } from '@tanstack/react-router'

import EmailTemplateNew from '@/components/07-pages/admin/EmailTemplates/EmailTemplateNew/EmailTemplateNew.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates/new')({
    component: EmailTemplateNew
})
