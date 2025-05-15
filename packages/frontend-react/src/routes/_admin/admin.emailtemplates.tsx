import { createFileRoute } from '@tanstack/react-router'

import EmailTemplates from '@/components/07-pages/admin/EmailTemplates/EmailTemplates.lazy'

export const Route = createFileRoute('/_admin/admin/emailtemplates')({
    component: EmailTemplates
})
