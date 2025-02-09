import type { ReactNode } from 'react'

import type { Payment } from '@/types/records'

export interface UserTransactionItemsProps {
    children?: ReactNode
    data: Payment
}
