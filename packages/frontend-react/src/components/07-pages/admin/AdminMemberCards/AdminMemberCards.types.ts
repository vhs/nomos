import type { ReactNode } from 'react'
import { z } from 'zod'
import { zIssueGenuineCardForm, zRegisterGenuineCardForm } from './AdminMemberCards.schema'

export interface AdminMemberCardsProps {
    children?: ReactNode
}

export type RegisterGenuineCardForm = z.infer<typeof zRegisterGenuineCardForm>

export type IssueGenuineCardForm = z.infer<typeof zIssueGenuineCardForm>
