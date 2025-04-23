import type { ReactNode } from 'react'

import type { EmailTemplate } from '@/types/validators/records'

export interface EmailTemplateItemProps {
    children?: ReactNode
    data: EmailTemplate
}
