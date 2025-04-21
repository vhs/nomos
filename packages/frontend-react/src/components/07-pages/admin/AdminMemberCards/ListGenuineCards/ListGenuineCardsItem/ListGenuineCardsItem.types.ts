import { GenuineCard } from '@/types/validators/records'
import type { ReactNode } from 'react'

export interface ListGenuineCardsItemProps {
    children?: ReactNode
    data: GenuineCard
}
