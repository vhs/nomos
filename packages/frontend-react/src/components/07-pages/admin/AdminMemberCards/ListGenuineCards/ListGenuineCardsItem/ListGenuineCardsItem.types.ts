import type { ReactNode } from 'react'

import type { GenuineCard } from '@/types/validators/records'

export interface ListGenuineCardsItemProps {
    children?: ReactNode
    data: GenuineCard
}
