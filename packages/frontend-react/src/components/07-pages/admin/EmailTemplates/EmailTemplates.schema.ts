import { zEmailTemplate } from '@/lib/validators/records'

export const zEmailTemplateForm = zEmailTemplate.omit({ id: true })
