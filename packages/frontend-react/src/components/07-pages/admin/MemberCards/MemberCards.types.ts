import type { ReactNode } from 'react'

import type { zIssueGenuineCardForm, zRegisterGenuineCardForm } from './MemberCards.schema'
import type { z } from 'zod'

export interface MemberCardsProps {
    children?: ReactNode
}

export type RegisterGenuineCardForm = z.infer<typeof zRegisterGenuineCardForm>

export type IssueGenuineCardForm = z.infer<typeof zIssueGenuineCardForm>
