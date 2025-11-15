import { createFileRoute } from '@tanstack/react-router'

import EmailTemplateEdit from '@/components/07-pages/admin/EmailTemplates/EmailTemplateEdit/EmailTemplateEdit.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates/$templateId')({
    component: EmailTemplateEdit
})
