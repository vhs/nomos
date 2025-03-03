import type { ReactNode } from 'react'

import type { Payment } from '@/types/validators/records'

export interface UserTransactionItemsProps {
    children?: ReactNode
    data: Payment
}
