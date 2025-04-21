import type { ReactNode } from 'react'

import type { Payment } from '@/types/validators/records'

export interface ListGenuineCardPurchasesItemProps {
    children?: ReactNode
    data: Payment
}
