import { createFileRoute } from '@tanstack/react-router'

import AdminEmailTemplateEdit from '@/components/07-pages/admin/AdminEmailTemplates/AdminEmailTemplateEdit/AdminEmailTemplateEdit.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates/$templateId')({
    component: AdminEmailTemplateEdit
})
