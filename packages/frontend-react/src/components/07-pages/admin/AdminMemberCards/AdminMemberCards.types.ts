import type { ReactNode } from 'react'

import type { zIssueGenuineCardForm, zRegisterGenuineCardForm } from './AdminMemberCards.schema'
import type { z } from 'zod'

export interface AdminMemberCardsProps {
    children?: ReactNode
}

export type RegisterGenuineCardForm = z.infer<typeof zRegisterGenuineCardForm>

export type IssueGenuineCardForm = z.infer<typeof zIssueGenuineCardForm>
